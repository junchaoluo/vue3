<template>
  <div class="basic-info-container">
    <el-card type="box-card">
        <template #header>
            <div class="card-header">基础信息</div>
        </template>
        <div>
            <el-form :model="basicInfoForm" :rules="rules" ref="basicform" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item prop="productId" label="产品号">
                            <template v-if="type === '1'">
                                {{ basicInfoForm.productCode }}
                            </template>
                            <template v-else>
                                <el-select placeholder="请选择产品号" @change="changeProduct" filterable clearable :remote="true" :remote-method="options.productRemoteMethod"  v-model="basicInfoForm.productId">
                                    <el-option v-for="item in options.product.list" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目编号" prop="code">
                            <template v-if="type === '1'">
                                {{ basicInfoForm.code }}
                            </template>
                            <template v-else>
                                <el-input v-model="basicInfoForm.code" placeholder="请输入项目编号"></el-input>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="productId" label="项目类型">
                            <template v-if="type === '1'">
                                {{ basicInfoForm.projectType }}
                            </template>
                            <template v-else>
                                <el-select placeholder="请选择项目类型" filterable clearable v-model="basicInfoForm.projectType">
                                    <el-option v-for="item in options.projectTypeList" :label="item.value" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item prop="cycle" label="项目周期">
                            <template v-if="type === '1'">
                                {{ `${basicInfoForm.startTime}~${basicInfoForm.endTime}`}}
                            </template>
                            <template v-else>
                                <el-date-picker
                                    v-model="basicInfoForm.cycle"
                                    type="daterange"
                                    format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="changeDate">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属部门" prop="departmentIds">
                            <template v-if="type === '1'">
                                {{ basicInfoForm.departmentName }}
                            </template>
                            <template v-else>
                                <el-cascader
                                    placeholder="请选择部门"
                                    :clearable="true"
                                    v-model="basicInfoForm.departmentIds"
                                    :options="options.departmentData" 
                                    ref="cascaderPanelRef"
                                    :props="{
                                        value: 'id',
                                        label: 'name',
                                        children: 'childNode'
                                    }"
                                    @change="changeDepartment" />
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item prop="description" label="项目描述">
                            <template v-if="type === '1'">
                                {{ basicInfoForm.description }}
                            </template>
                            <template v-else>
                                <el-input type="textarea" v-model="basicInfoForm.description" placeholder="请输入项目描述"></el-input>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue"
import type { FormRules, CascaderValue, FormInstance } from 'element-plus'
import useOptions from '../hooks/useOptions'
import useProjectInfo from '../hooks/useProjectInfo'
import { useRoute } from 'vue-router'

const options = useOptions()
const project = useProjectInfo()
const route = useRoute()
const type = route.query?.type

const basicform = ref<FormInstance>()
const basicInfoForm = reactive({
    id: '',
    productId: '',
    productCode: '',
    code: [],
    projectType: '',
    cycle: [],
    startTime: '',
    endTime: '',
    departmentIds: [],
    departmentId: '',
    departmentName: '',
    description: ''
})
const rules = reactive<FormRules>({
    productId: [{required: true, message: '请选择产品号'}],
    code: [{required: true, message: '请输入项目编号'}],
    cycle: [{required: true, message: '请选择项目周期'}],
})

const queryProject = async () => {
    const result = await project.getProjectInfo(route.query?.id)
    basicInfoForm.id = result.id
    basicInfoForm.productId = result.productId
    basicInfoForm.productCode = result.productCode
    basicInfoForm.code = result.code
    basicInfoForm.projectType = result.projectType
    basicInfoForm.cycle = [result.startTime || '', result.endTime || '']
    basicInfoForm.startTime = result.startTime
    basicInfoForm.endTime = result.endTime
    basicInfoForm.departmentIds = result.departments.map(item => item.id)
    basicInfoForm.departmentId = result.departmentId
    basicInfoForm.departmentName = result.departments.map(item => item.name).join('/')
    basicInfoForm.description = result.description
}
if(route.query?.id) {
    queryProject()
}

onBeforeMount(() => {
    options.productRemoteMethod('')
    options.getDeptTreeData()
})

// 修改产品号
const changeProduct = (value) => {
    if(value) {
        basicInfoForm.productCode = options.product.list.find(item => item.value === value)?.label ?? ''
    }else{
        basicInfoForm.productCode = ''
    }
}

// 修改时间
const changeDate = (val: string[] | null) => {
    basicInfoForm.startTime = val?val[0]:''
    basicInfoForm.endTime = val?val[0]:''
}

const cascaderPanelRef = ref(null)
// 修改部门
const changeDepartment = (_value: CascaderValue) => {
    const checkNodes = cascaderPanelRef.value.getCheckedNodes() ? cascaderPanelRef.value.getCheckedNodes()[0] : []
    if(checkNodes) {
        basicInfoForm.departmentId = checkNodes.pathValues[checkNodes.pathValues.length - 1]
        basicInfoForm.departmentName = checkNodes.pathLabels[checkNodes.pathLabels.length - 1]
    }else{
        basicInfoForm.departmentId = ''
        basicInfoForm.departmentName = ''
    }
}

// 验证必填
const doValidate = async () => {
    const res = await basicform.value.validate()
    return res
}

defineExpose({
    basicInfoForm,
    doValidate
})

</script>

<style lang="scss" scoped>
.basic-info-container {
    margin-bottom: 16px;
    .el-card__header {
        padding: 16px;
    }
    .card-header {
        text-align: left;
    }
}
</style>
