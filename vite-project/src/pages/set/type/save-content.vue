<template>
  <el-dialog v-model="visible" width="50%" custom-class="save-content-dialog" :before-close="beforeClose">
    <template #header="{ close, titleId, titleClass}">
      <div class="header">
        <h4 :id="titleId">{{ title }}</h4>
      </div>
    </template>
    <div>
      <el-form :model="form" ref="formRef" :rules="formRules" label-position="top">
        <el-form-item label="类型名称" prop="name">
          <el-input placeholder="请输入类型名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input placeholder="请输入类型编号" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="记录维度" prop="recordDimension">
          <el-radio-group v-model="form.recordDimension">
            <el-radio label="project">项目</el-radio>
            <el-radio label="product">产品</el-radio>
            <el-radio label="taskNo">任务</el-radio>
            <el-radio label="productAndProject">产品+项目</el-radio>
            <el-radio label="productAndProjectAndTaskNo">产品+项目+任务</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { TypeParams } from '@/interfaces/type'
import { addExperimentClassification, reviseExperimentClassification } from '@/api/type'

interface Props {
  dialogVisible: boolean,
  type: number,
  editRowData: object
}

const emits = defineEmits(['confirm', 'close'])
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
  type: 1,
  editRowData: {}
})

const { dialogVisible, type, editRowData } = toRefs(props)

const visible = ref(false)
const title = ref('新增实验类型')
watch([type, dialogVisible], ([newType, newDialogVisible], [oldType, oldDialogVisible]) => {
  title.value = newType == 1?'新增实验类型':'编辑实验类型'
  visible.value = newDialogVisible
}, {
  immediate: true
})

const beforeClose = () => {
  visible.value = false
  emits('close')
}

const form:TypeParams = reactive({
  id: '',
  name: '',
  code: '',
  recordDimension: 'project',
  openFormula: 0,
  openTable: 0
})
watchEffect(() => {
  console.log(editRowData)
  form.id = editRowData.value.id ?? ''
  form.name = editRowData.value.name ?? ''
  form.code = editRowData.value.code ?? ''
  form.recordDimension = editRowData.value.recordDimension ?? 'project'
})

const formRef = ref<FormInstance>()
const formRules = reactive<FormRules<TypeParams>>({
  name: [
    {
      required: true,
      message: '请输入类型名称'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入类型编号'
    }
  ],
  recordDimension: [
    {
      required: true,
      message: '请选择记录维度'
    }
  ]
})

const confirm = () => {
  formRef.value.validate(async (valid, fields) => {
    if(valid) {
      if(type.value === 1) {
        // 新增
        const { code } = await addExperimentClassification(form)
        if(code === 0){
          emits('close')
        }
      }
      if(type.value === 2) {
        // 编辑
        const { code } = await reviseExperimentClassification(form)
        if(code === 0){
          emits('close')
        }
      }
    }
  })
}

</script>

<style lang="scss">
@mixin border($position) {
  @if $position == 'bottom' {border-bottom: 1px solid #dcdee0}
  @if $position == 'top' {border-top: 1px solid #dcdee0}
}

@mixin padding($position, $number) {
  @if $position == 'bottom' {padding-bottom: $number}
  @if $position == 'top' {padding-top: $number}
}

.save-content-dialog {
  .el-dialog__header {
    margin-right: 0;
    @include border('bottom');
    @include padding('top', 20px);
    .header {
      text-align: left;
      h4 {
        margin: 0;
      }
    }
  }
  .el-dialog__footer {
    @include border('top');
    @include padding('bottom', 12px);
  }
}
</style>
