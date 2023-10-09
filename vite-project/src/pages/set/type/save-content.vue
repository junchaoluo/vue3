<template>
  <el-dialog v-model="dialogVisible" width="30%" :title="title"></el-dialog>
</template>

<script setup lang="tsx">
interface Props {
  dialogVisible: boolean,
  type: number,
  editRowData: object
}

const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
  type: 1,
  editRowData: {}
})

const { dialogVisible, type, editRowData } = toRefs(props)
const title = ref('新增实验类型')
watchEffect(() => {
  title.value = type === 1?'新增实验类型':'编辑实验类型'
})

</script>

<style lang="scss" scoped></style>
