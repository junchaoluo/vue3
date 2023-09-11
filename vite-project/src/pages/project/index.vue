<template>
  <div class="project-container">
    <div class="module">
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
      <div class="table">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import type {} from 'ele'

type StatusTabList = {
 name: string,
 value: number 
}
type Page = {
  pageNum: number,
  pageSize: number
}

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

  }
]
const tableData = reactive([])

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
  }
}
</style>
