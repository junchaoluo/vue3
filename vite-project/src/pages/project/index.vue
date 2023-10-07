<template>
  <div class="project-container" v-resize="handlerSize">
    <div class="module">
      <div class="top" ref="top">
        <div class="status">
          <span class="status-label">当前状态：</span>
          <el-tabs type="card" class="demo-tabs" v-model="activeTab">
            <el-tab-pane v-for="tab in statusTabList" :name="tab.value" :label="tab.name"></el-tab-pane>
          </el-tabs>
        </div>
        <el-divider border-style="dashed" />
        <div class="search">
          <el-button type="primary" @click="addProject">新增项目</el-button>
          <div class="search-operate">
            <el-input v-model="searchParams.keywords" class="mr12" placeholder="请输入项目编号查询"/>
            <el-button class="mr12" type="primary" @click="search">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="table" v-loading="loading">
        <CustomTable
          :columns="columns" 
          :data="tableData" 
          :showPage="showPage" 
          :total="total" 
          :page-num="searchParams.pageIndex" 
          :page-size="searchParams.pageSize" 
          :height="tableHeight"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"></CustomTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import CustomTable from '@/components/custom-table/index.vue'
import { getProjectListByPage, getArchiveProjectListByPage, archiveAndProject, renewAndProject } from '@/api/project'
import { ElMessage, RenderRowData } from 'element-plus'
import { Fragment } from 'vue';
import {useRouter} from 'vue-router';

type StatusTabList = {
 name: string,
 value: number 
}
type Page = {
  pageIndex: number,
  pageSize: number
}
type SearchParams = Page & {
  keywords: string
}

const router = useRouter()

const top = ref<any>(null)
const topHeight = ref<number>(0)
const tableHeight = ref<number | string>(0)
const showPage = ref(true)
const pageHeight = ref<number>(showPage.value ? 48 : 0)

const handlerSize = (info) => {
  topHeight.value = top.value.offsetHeight
  tableHeight.value = (info?.height - topHeight.value - 48 - pageHeight.value) || '100%'
}

onMounted(() => {
  nextTick(() => {
    topHeight.value = top.value.offsetHeight
    tableHeight.value = `calc(100vh - ${topHeight.value}px - 136px - ${pageHeight.value}px)`
  })
})

// tab状态
const statusTabList = reactive<Array<StatusTabList>>([
  {
    name: '进行中',
    value: 0
  },
  {
    name:' 已归档',
    value: 1
  }
])
const activeTab = ref<number>(0)

// 关键字
const searchParams = reactive<SearchParams>({
  keywords: '',
  pageIndex: 1,
  pageSize: 20
})
const columns = reactive([
  {
    label: '项目编号',
    prop: 'code',
    minWidth: 200,
    render: (scope: RenderRowData<any>) => {
      return (
        <el-button link type="primary">{scope.row.code}</el-button>
      )
    }
  },
  {
    label: '起止时间',
    prop: 'startTime',
    minWidth: 200,
  },
  {
    label: '实验记录数',
    prop: 'notebookQuantity',
    minWidth: 200,
  },
  {
    label: 'PM',
    prop: 'PM',
    minWidth: 200,
    render: (scope: RenderRowData<any>) => {
      let pm = scope.row.pmUserProjectInfos.map((item: {
        userName: string,
        projectId: string,
        roleId: string,
        roleName: string,
        userId: string
      }) => item.userName)
      return (
        <span>{pm.join(',')}</span>
      )
    }
  },
  {
    label: '所属部门',
    prop: 'departmentName',
    minWidth: 200,
  },
  {
    label: '项目类型',
    prop: 'projectType',
    minWidth: 200,
  },
  {
    label: '项目成员数',
    prop: 'userQuantity',
    minWidth: 200,
  },
  {
    label: '创建人',
    prop: 'createUser',
    minWidth: 200,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    minWidth: 200,
  },
  {
    label: '操作',
    fixed: 'right',
    minWidth: 150,
    render: (scope: RenderRowData<any>) => {
      return (
        <div>
          <el-button type="primary" link onClick={() => operateProject(scope.row, 1)}>查看</el-button>
          {
            activeTab.value === 0 ?
            <Fragment>
              <el-button type="primary" link disabled={!scope.row.canEdit} onClick={() => operateProject(scope.row, 2)}>编辑</el-button>
              <el-popconfirm
                width="220" 
                confirm-button-text="确定"
                cancel-button-text="取消"
                onConfirm={() => operateProject(scope.row, 3)}
                title="请确认是否将此项目完结">
                {{
                  reference: () => <el-button type="primary" link disabled={!scope.row.canArchive}>结束</el-button>
                }}
              </el-popconfirm>
            </Fragment>
              :
              <el-popconfirm
                width="220" 
                confirm-button-text="确定"
                cancel-button-text="取消"
                onConfirm={() => operateProject(scope.row, 4)}
                title="请确认是否将此项目恢复">
                {{
                  reference: () => <el-button type="primary" link disabled={!scope.row.canRenew}>恢复</el-button>
                }}
              </el-popconfirm>
            
          }
        </div>
      )
    }
  }
])
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

const getTableData = async () => {
  loading.value = true
  let func = activeTab.value === 0 ? getProjectListByPage : getArchiveProjectListByPage
  const { code, result } = await func(searchParams)
  if(code === 0) {
    tableData.value = result.list || []
    total.value = Number(result.total) || 0
  }
  loading.value = false
}
const search = () => {
  searchParams.pageIndex = 1
  searchParams.pageSize = 20
  getTableData()
}
search()

const handleSizeChange = (pageSize: number) => {
  searchParams.pageSize = pageSize
  getTableData()
}
const handleCurrentChange = (pageIndex: number) => {
  searchParams.pageIndex = pageIndex
  getTableData()
}

watch(activeTab, (_val: number, _oldV: number) => {
  search()
})

// 新增项目
const addProject = () => {
  router.push('/project/add')
}
// 查看、编辑项目 type 1:查看 2：编辑
const operateProject = async (row, type) => {
  switch(type) {
    case 1:
      router.push(`/project/add?id=${row.id}&type=${type}`)
      break;
    case 2:
      router.push(`/project/add?id=${row.id}&type=${type}`)
      break;
    case 3:
      const res = await archiveAndProject({
        id: row.id
      })
      if(res.code === 0) {
        ElMessage.success('项目归档成功！')
        searchParams.keywords = ''
        search()
      }else {
        ElMessage.error(res.expandMsg)
      }
      break;
    case 4:
      const res1 = await renewAndProject({
        id: row.id
      })
      if(res1.code === 0) {
        ElMessage.success('项目恢复成功！')
        searchParams.keywords = ''
        search()
      }else {
        ElMessage.error(res1.expandMsg)
      }
      break;
    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.project-container {
    background-color: #fff;
    margin: 16px;
    height: calc(100vh - 88px);
    width: calc(100vw - 210px);
    border-radius: 4px;
  .module {
    padding: 16px;
    .status {
      display: flex;
      align-items: center;
      .status-label {
        margin-right: 14px;
      }
      ::v-deep .el-tabs {
        .el-tabs__header {
          margin-bottom: 0;
        }
      }
    }
    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search-operate {
        display: flex;
        align-items: center;
      }
    }
    .table {
      padding-top: 16px;
    }
  }
}
</style>
