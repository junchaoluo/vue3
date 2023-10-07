<template>
  <div class="add-project-container">
    <div class="content" :style="{ height: type !== '1'? 'calc(100vh - 120px)' : `calc(100vh - 72px)` }">
        <div class="basic-info">
            <BasicInfo ref="basicInfoRef" :id="id" :type="type" />
        </div>
        <div class="project-member">
            <ProjectMember ref="projectMemberRef" :id="id" :type="type" />
        </div>
    </div>
    <div class="operation" v-if="type !== '1'">
        <el-button type="">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import BasicInfo from '@/pages/project/components/basic-info.vue'
import ProjectMember from '@/pages/project/components/project-member.vue'
import { createProject, updateProject } from '@/api/project'
import { ElMessage } from 'element-plus';
import { useRouter, useRoute, toRaw } from 'vue-router'

const router = useRouter()
const route = useRoute()
const basicInfoRef = ref(null)
const projectMemberRef = ref(null)
const type = route.query?.type

// 验证
const doValidate = () => {
    return new Promise(async (resolve, reject) => {
        let basicInfoFlag = await basicInfoRef.value.doValidate()
        let projectMemberFlag = projectMemberRef.value.doValidate()
        if(basicInfoFlag && projectMemberFlag) {
            let basicForm = basicInfoRef.value.basicInfoForm
            const params = {
                id: basicForm.id,
                name: basicForm.name,
                code: basicForm.code,
                productId: basicForm.productId,
                productCode: basicForm.productCode,
                departmentId: basicForm.departmentId,
                departmentName: basicForm.departmentName,
                startTime: (basicForm.cycle && basicForm.cycle[0]) || '',
                endTime: (basicForm.cycle && basicForm.cycle[1]) || '',
                description: basicForm.description,
                projectType: basicForm.projectType
            }
            const user = projectMemberRef.value.table.tableData
            params.user = user
            if(!route.query?.id) {
                params.user.forEach(item => {
                    item.roleId = item.id
                    item.roleName = item.name
                })
            }
            resolve(params)
        }
    })
}

const save = () => {
    doValidate().then((params) => {
        let func = createProject
        if (route.query?.id) {
            func = updateProject
        }
        func(params).then(() => {
            ElMessage.success('编辑成功！')
            router.push('/project')
        })
    })
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
