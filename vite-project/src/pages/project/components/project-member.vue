<template>
  <div class="project-member-container">
    <el-card type="box-card">
        <template #header>
            <div class="card-header">项目人员</div>
        </template>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import {} from "vue"
</script>

<style lang="scss" scoped>
.project-member-container {
    margin-bottom: 16px;
    .el-card__header {
        padding: 16px;
    }
    .card-header {
        text-align: left;
    }
}
</style>
