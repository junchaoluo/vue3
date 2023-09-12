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
            <el-input v-model="keyword" class="mr12" placeholder="请输入项目编号查询"/>
            <el-button class="mr12" type="primary" @click="search">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="table">
        <CustomTable :columns="columns" :data="tableData" :showPage="showPage" :total="total" :page-num="page.pageNum" :page-size="page.pageSize" :height="tableHeight"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomTable from '@/components/custom-table/index.vue'

type StatusTabList = {
 name: string,
 value: number 
}
type Page = {
  pageNum: number,
  pageSize: number
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
const activeTab = ref(0)

// 关键字
const keyword = ref('')
const page = reactive<Page>({
  pageNum: 1,
  pageSize: 20
})
const columns = [
  {
    label: '项目编号',
    prop: 'code',
    minWidth: 200,
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
  }
]
const tableData = reactive([])
const total = ref(0)

const getTableData = () => {

}
const search = () => {
  page.pageNum = 1
  page.pageSize = 20
  getTableData()
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
