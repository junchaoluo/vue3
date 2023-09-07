<template>
  <div class="app-container">
    <Sider/>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {} from "vue"
import Sider from './sider.vue'
import Header from './header.vue'
</script>

<style lang="scss" scoped></style>
