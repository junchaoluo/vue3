<template>
  <div class="header-container">
    <div class="header-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: currentRouter.path }">{{currentRouter.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface CurrentRouterProps {
  name?: any,
  path: any,
  [propName: string]: unknown
}

// 当前路由信息
const currentRouter: CurrentRouterProps = reactive({
  name: '',
  path: ''
})

watchEffect(() => {
  console.log(useRouter().currentRoute.value.name, currentRouter.name)
  currentRouter.name = useRouter().currentRoute?.value?.name || ''
  currentRouter.path = useRouter().currentRoute?.value?.path || ''
})

</script>

<style lang="scss" scoped>
.header-container {
  height: 56px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  .header-breadcrumb {
    padding: 0 24px;
  }
}
</style>
