<template>
  <div class="add-project-container">
    <div class="content">
        <div class="basic-info">
            <BasicInfo ref="basicInfoRef" />
        </div>
        <div class="project-member">
            <ProjectMember ref="projectMemberRef"/>
        </div>
    </div>
    <div class="operation">
        <el-button type="">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import BasicInfo from '@/pages/project/components/basic-info.vue'
import ProjectMember from '@/pages/project/components/project-member.vue'

const basicInfoRef = ref(null)
const projectMemberRef = ref(null)

const save = () => {
    console.log(basicInfoRef, projectMemberRef.value.table.tableData)
}

</script>

<style lang="scss" scoped>
.content {
    height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;
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
