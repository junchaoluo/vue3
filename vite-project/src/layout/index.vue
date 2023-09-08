<template>
  <div class="app-container">
    <div class="left">
      <Sider/>
    </div>
    <div class="right">
      <div class="header">
        <Header></Header>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import Sider from './sider.vue'
import Header from './header.vue'
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100vh;
  background-color: #f2f3f7;
  .left {
    width: 210px;
  }
  .right {
    width: 100%;
  }
}
</style>
