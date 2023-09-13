<template>
  <div class="sider-container">
    <el-menu :default-active="activeMenu" :collapse="isCollapse" :router="true" @select="selectMenu">
      <template v-for="menuRoute in menuNavRoutes">
        <template v-if="menuRoute.children && menuRoute.children.length > 0">
          <el-sub-menu :index="menuRoute.path">
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
import { RouteRecordRaw, useRouter } from 'vue-router'

const router = useRouter()

// 菜单是否折叠
const isCollapse = ref<boolean>(false)

const clearMenuRoutes = () => {
  return menuRoutes.filter(item => item.meta.isNav)
}
const menuNavRoutes = reactive(clearMenuRoutes())

const findRoute = () => {
  let firstMenu = ''
  const findRoute: RouteRecordRaw = menuNavRoutes.find((menuRoute: RouteRecordRaw) => menuRoute.meta.isMenu)
  firstMenu = findRoute?findRoute.path : menuNavRoutes[0].children[0].path
  return firstMenu
}
const activeMenu = ref('')
onMounted(() => {
  activeMenu.value = findRoute()
})

const selectMenu = (path: string) => {
  activeMenu.value = path
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
