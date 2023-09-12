<template>
  <div class="custom-table">
    <el-table
        :data="data"
        :height="height"
        :max-height="maxHeight"
        :flexible="true"
    >
        <el-table-column
            v-for="tableColumn in columns"
            v-bind="tableColumn">
        </el-table-column>
    </el-table>
    <template v-if="showPage">
        <div class="custom-page">
            <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                :page-sizes="pageSizeOptions"
                :small="pageIsSmall"
                :layout="pageLayout"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

type TableProps = {
    columns: Array<any>, // 表头
    data: Array<any>, // 数据
    total?: number, // 数据总数
    height?: number | string, // 最大高度
    maxHeight?: number | string, // 最大高度
}

type PageProps = {
    showPage?: boolean, // 是否展示分页
    pageNum?: number, // 第几页
    pageSize?: number, // 一次查询多少条
    pageSizeOptions?: Array<number>, // 页数
    pageIsSmall?: boolean, // 是否小型翻页器
    pageLayout?: string // 分页展示
}

type Props = TableProps & PageProps
const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    data: () => [],
    total: 0,
    maxHeight: '100%',
    height: '100%',
    showPage: true,
    pageNum: 1,
    pageSize: 20,
    pageSizeOptions: () => [10, 20, 50, 100, 200, 300, 400],
    pageIsSmall: false,
    pageLayout: 'total, sizes, prev, pager, next, jumper'
})
const { columns, data, total, maxHeight, height, showPage, pageNum, pageSize, pageSizeOptions, pageIsSmall, pageLayout } = toRefs(props)

const emits = defineEmits(['handleSizeChange', 'handleCurrentChange'])
const handleSizeChange = (pageSize: number) => {
    emits('handleSizeChange', pageSize)
}
const handleCurrentChange = (pageNum: number) => {
    emits('handleCurrentChange', pageNum)
}

</script>

<style lang="scss" scoped>
.custom-page {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 16px;
}
</style>
