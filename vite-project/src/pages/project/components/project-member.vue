<template>
  <div class="project-member-container">
    <el-card type="box-card">
        <template #header>
            <div class="card-header">
                <span>项目人员</span>
                <span class="tips">默认项目组成员都可以查看此项目下内容</span>
            </div>
        </template>
        <div>
            <CustomTable :columns="table.columns" :data="table.tableData" :show-page="false"/>
        </div>
        <!-- 选择人员组件 -->
        <UserChoose :visible="selectUserModal" @close="closeChooseUser" @confirm="confirmChooseUser"/>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { Fragment } from "vue"
import CustomTable from '@/components/custom-table/index.vue'
import { RenderRowData } from "element-plus";
import { User, Delete } from '@element-plus/icons-vue'
import UserSelect from '@/components/user-choose/user-select.vue'
import { getProjectRoleList } from '@/api/project'
import UserChoose from '@/components/user-choose/index.vue'

const table = reactive({
    tableData: [{users: []}],
    columns: [
        {
            label: '岗位',
            prop: 'name',
            width: 200,
            render: (scope: RenderRowData<any>) => {
                return (
                    <Fragment>
                        <span class='required-icon'>{scope.row.isCheck?'*':''}</span>
                        <span>{scope.row.name || ''}</span>
                    </Fragment>
                )
            }
        },
        {
            label: '人员配置',
            prop: 'user',
            render: (scope: RenderRowData<any>) => {
                return (
                    <UserSelect users={scope.row.users || []} onHandleChange={($event) => onChangeUser(scope, $event)} />
                )
            }
        },
        {
            label: '操作',
            width: 100,
            render: (scope: RenderRowData<any>) => {
                return (
                    <Fragment>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="选择成员"
                            placement="bottom"
                        >
                            <el-icon onClick={() =>chooseUser(scope)}><User /></el-icon>
                        </el-tooltip>
                        <el-divider direction="vertical" />
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="清除全部"
                            placement="bottom"
                        >
                            <el-icon onClick={() => clearAllUser(scope.$index)}><Delete /></el-icon>
                        </el-tooltip>
                    </Fragment>
                )
            }
        },
    ]
})
const getRoleList = async () => {
    const { result } = await getProjectRoleList()
    table.tableData = result
}
getRoleList()

// 选择成员改变
const onChangeUser = (scope: RenderRowData<any>, event: any) => {
    let data = table.tableData.map((item, index) => {
        if(index === scope.$index) {
            item.users = event.value || []
        }
        return item
    })
    table.tableData = data
}
// 选择的是哪一行的数据进行人员选择
const editRowIndex = ref<number>(0)
const selectUserModal = ref<boolean>(false)
const editRowSelectUser = ref<Array<any>>([])
// 点击选择人员弹框
const chooseUser = (scope: RenderRowData<any>) => {
    console.log(scope)
    editRowIndex.value = scope.$index
    editRowSelectUser.value = scope.users || []
    selectUserModal.value = true
}
const closeChooseUser = () => {
    selectUserModal.value = false
}
const confirmChooseUser = (a) => {
    console.log(a)
}
// 清除所有人员
const clearAllUser = (index: number) => {
    table.tableData.splice(index, 1)
}

defineExpose({
    table
})

</script>

<style lang="scss" scoped>
.project-member-container {
    // margin-bottom: 16px;
    .el-card__header {
        padding: 16px;
    }
    .card-header {
        text-align: left;
        .tips {
            margin-left: 16px;
            color: #999ba3;
            vertical-align: bottom;
            font-size: 12px;
            line-height: 20px;
        }
    }
}
</style>
