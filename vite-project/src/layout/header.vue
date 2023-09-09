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
import { RouteRecordRaw } from 'vue-router'
import { breadcrumbStore } from '@/store/breadcrumb'

const currentRouter: RouteRecordRaw = computed(() => {
  return breadcrumbStore().currentRoute
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
