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
            <CustomTable :columns="columns" :data="tableData" :show-page="false"/>
        </div>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { Fragment } from "vue"
import CustomTable from '@/components/custom-table/index.vue'
import { RenderRowData } from "element-plus";
import { User, Delete } from '@element-plus/icons-vue'
import UserSelect from '@/components/user-choose/user-select.vue'

const columns = reactive([
    {
        label: '岗位',
        prop: 'name',
        width: 200,
        render: (scope: RenderRowData<any>) => {
            return (
                <Fragment>
                    <span>{scope.row.isCheck?'*':''}</span>
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
                <UserSelect  users={[]}/>
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
                        <el-icon><User /></el-icon>
                    </el-tooltip>
                    <el-divider direction="vertical" />
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="清除全部"
                        placement="bottom"
                    >
                        <el-icon><Delete /></el-icon>
                    </el-tooltip>
                </Fragment>
            )
        }
    },
])
const tableData = reactive([{}])

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
