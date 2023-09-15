<template>
  <el-dialog v-model="dialogVisible" title="选择人员" :close-on-click-modal="false">
    <div>123</div>
  </el-dialog>
</template>

<script setup lang="tsx">
import {} from "vue"

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})
const { visible } = toRefs(props)
const dialogVisible = computed(() => visible.value)

</script>

<style lang="scss" scoped></style>
