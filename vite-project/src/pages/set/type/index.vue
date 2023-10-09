<template>
  <div class="type-container">
    <div class="module">
      <div class="header" ref="top">
        <el-button type="primary" @click="addType()">
          <el-icon><Plus /></el-icon>
          新增类型
        </el-button>
      </div>
      <div class="table" v-loading="loading">
        <CustomTable 
          :data="table.tableData" 
          :columns="columns" 
          :show-page="showPage"
          :page-num="searchParams.pageNum"
          :page-size="searchParams.pageSize"
          :total="table.total"
          :height="tableHeight"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange" />
      </div>
    </div>
    <SaveContent 
      v-if="dialogVisible" 
      :dialogVisible="dialogVisible" 
      :type="editData.type" 
      :editRowData="editData.rowData"
      @close="close"/>
  </div>
</template>

<script lang="tsx">
import { Plus } from '@element-plus/icons-vue'
import CustomTable from '@/components/custom-table/index.vue'
import { getExperimentClassification, deleteExperimentClassification } from '@/api/type'
import SaveContent from './save-content.vue'

export default {
  name: 'type',
  components: {
    Plus,
    CustomTable,
    SaveContent
  },
  setup(props, { attrs, emit, slots, expose }) {
    const searchParams = reactive({
      pageNum: 1,
      pageSize: 10,
      keywords: ''
    })
    const table = reactive({
      total: 0,
      tableData: []
    })
    const loading = ref(false)
    const getTableData = async () => {
      loading.value = true
      const {result} = await getExperimentClassification(searchParams)
      table.total = result?.total - 0 || 0
      table.tableData = result?.list || []
      loading.value = false
    }
    const search = () => {
      searchParams.pageNum = 1
      getTableData()
    }
    const handleSizeChange = (pageSize: number) => {
      searchParams.pageNum = pageSize
      getTableData()
    }
    const handleCurrentChange = (pageIndex: number) => {
      searchParams.pageSize = pageIndex
      getTableData()
    }

    const dialogVisible = ref(false)
    // const type = ref(1) // 1:新增 2：编辑
    const editData = reactive({
      rowData: {},
      type: 1 // 1:新增 2：编辑
    })
    // 新增
    const addType = () => {
      editData.type = 1
      editData.rowData = {}
      dialogVisible.value = true
    }
    // 编辑
    const handleEdit = (oEvent, row) => {
      oEvent.stopPropagation()
      oEvent.preventDefault()
      editData.type = 2
      editData.rowData = row
      dialogVisible.value = true
    }
    // 弹窗关闭
    const close = () => {
      dialogVisible.value = false
      search()
    }

    // 删除
    const handleDelete = async (oEvent, row) => {
      oEvent.stopPropagation()
      oEvent.preventDefault()
      const { code } = await deleteExperimentClassification({
        list: [row.id]
      })
      if(code === 0) {
        search()
      }
    }
    const columns = reactive([
      {
        label: '类型名称',
        prop: 'name',
        render: (scope: RenderRowData<any>) => {
          return <span>{scope.row.name}</span>
        },
        fixed: 'left',
        align: 'center',
        minWidth: 208
      },
      {
        label: '编号',
        prop: 'code',
        align: 'center',
        minWidth: 208
      },
      {
        label: '记录维度',
        prop: 'recordDimensionName',
        align: 'center',
        minWidth: 208
      },
      {
        label: '更新人',
        prop: 'updateUser',
        align: 'center',
        minWidth: 144
      },
      {
        label: '更新时间',
        prop: 'updateTime',
        align: 'center',
        minWidth: 208
      },
      {
        label: '操作',
        width: 160,
        render: (scope: RenderRowData<any>) => {
          return (
            <div>
              <el-button
                type="text"
                onClick={oEvent => {
                  handleDelete(oEvent, scope.row)
                }}
              >
                删除
              </el-button>
              <el-button
                type="text"
                onClick={oEvent => {
                  handleEdit(oEvent, scope.row)
                }}
              >
                编辑
              </el-button>
            </div>
          )
        }
      }
    ])
    
    const tableHeight = ref<string>('calc(100vh - 216px)')
    const showPage = ref(true)

    search()

    return {
      table,
      columns,
      searchParams,
      showPage,
      tableHeight,
      loading,
      handleSizeChange,
      handleCurrentChange,
      addType,
      dialogVisible,
      editData,
      close
    }
  }
}

</script>

<style lang="scss" scoped>
.type-container {
  margin: 16px;
  .module {
    background-color: #fff;
    border-radius: 4px;
    height: calc(100vh - 88px);
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      button {
        i {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
