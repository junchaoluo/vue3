<template>
  <div class="sider-container">
    <el-menu :collapse="isCollapse" :router="true" @select="selectMenu">
      <template v-for="menuRoute in menuRoutes">
        <template v-if="menuRoute.children && menuRoute.children.length > 0">
          <el-sub-menu index="2">
            <template #title>{{ menuRoute.name }}</template>
            <template v-for="menu in menuRoute.children">
              <el-menu-item :index="menu.path" :route="menu.path">{{menu.name}}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="menuRoute.path" :route="menuRoute.path">{{menuRoute.name}}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { menuRoutes } from '@/router/menu'
import { useRouter } from 'vue-router'

const router = useRouter()

// 菜单是否折叠
const isCollapse = ref<boolean>(false)

const selectMenu = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.sider-container {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
