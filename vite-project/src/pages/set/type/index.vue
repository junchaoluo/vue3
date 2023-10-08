<template>
  <div class="type-container">
    <div class="module">
      <div class="header" ref="top">
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          新增类型
        </el-button>
      </div>
      <div class="table" v-loading="loading">
        <CustomTable 
          :data="table.tableData" 
          :columns="table.columns" 
          :show-page="showPage"
          :page-num="searchParams.pageNum"
          :page-size="searchParams.pageSize"
          :total="table.total"
          :height="tableHeight"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Plus } from '@element-plus/icons-vue'
import CustomTable from '@/components/custom-table/index.vue'
import { getExperimentClassification } from '@/api/type'

export default {
  name: 'type',
  components: {
    Plus,
    CustomTable
  },
  setup(props, { attrs, emit, slots, expose }) {
    // 删除
    const handleDelete = (oEvent, row) => {
      oEvent.stopPropagation()
      oEvent.preventDefault()
    }
    // 编辑
    const handleEdit = (oEvent, row) => {
      oEvent.stopPropagation()
      oEvent.preventDefault()
    }

    const table = reactive({
      total: 0,
      tableData: [{}],
      columns: [
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
                    this.handleDelete(oEvent, scope.row)
                  }}
                >
                  {'删除'}{' '}
                </el-button>
                <el-button
                  type="text"
                  onClick={oEvent => {
                    this.handleEdit(oEvent, scope.row)
                  }}
                >
                  {' '}
                  {'编辑'}{' '}
                </el-button>
              </div>
            )
          }
        }
      ],
    })
    const searchParams = reactive({
      pageNum: 1,
      pageSize: 10,
      keywords: ''
    })
    const loading = ref(false)
    const tableHeight = ref<string>('calc(100vh - 216px)')
    const showPage = ref(true)

    const getTableData = async () => {
      const {result} = await getExperimentClassification(searchParams)
      table.total = result?.total - 0 || 0
      table.tableData = result?.list || []
    }
    const search = () => {
      searchParams.pageNum = 1
      getTableData()
    }
    search()

    const handleSizeChange = (pageSize: number) => {
      searchParams.pageNum = pageSize
      getTableData()
    }
    const handleCurrentChange = (pageIndex: number) => {
      searchParams.pageSize = pageIndex
      getTableData()
    }

    return {
      table,
      searchParams,
      showPage,
      tableHeight,
      loading,
      handleSizeChange,
      handleCurrentChange
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
