<template>
  <div class="add-project-container">
    <div class="content">
        <div class="basic-info"></div>
        <div class="project-member"></div>
    </div>
    <div class="operation">
        <el-button type="">取消</el-button>
        <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">

</script>

<style lang="scss" scoped>
.content {
    height: calc(100vh - 120px);
    padding: 16px;
    box-sizing: border-box;
    .basic-info,
    .project-member {
        margin-bottom: 16px;
        background-color: #fff;
    }
}
.operation {
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 16px 16px;
    position: sticky;
    bottom: 0;
}
</style>
