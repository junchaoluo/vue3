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
          <el-button type="primary">新增项目</el-button>
          <div class="search-operate">
            <el-input v-model="searchParams.keywords" class="mr12" placeholder="请输入项目编号查询"/>
            <el-button class="mr12" type="primary" @click="search">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="table">
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
import { getProjectListByPage, getArchiveProjectListByPage } from '@/api/project'
import type { RenderRowData } from 'element-plus'
import { Fragment } from 'vue';

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
  topHeight.value = top.value.offsetHeight
  tableHeight.value = `calc(100vh - ${topHeight.value}px - 136px - ${pageHeight.value}px)`
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
          <el-button type="primary" link>查看</el-button>
          {
            activeTab.value === 0 ?
            <Fragment>
              <el-button type="primary" link disabled={!scope.row.canEdit}>编辑</el-button>
              <el-button type="primary" link disabled={scope.row.canArchive}>结束</el-button>
            </Fragment>
              :
            <el-button type="primary" link disabled={scope.row.canRenew}>恢复</el-button>
          }
        </div>
      )
    }
  }
])
const tableData = ref([])
const total = ref(0)

const getTableData = async () => {
  let func = activeTab.value === 0 ? getProjectListByPage : getArchiveProjectListByPage
  const { code, result } = await func(searchParams)
  if(code === 0) {
    tableData.value = result.list || []
    total.value = Number(result.total) || 0
  }
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
