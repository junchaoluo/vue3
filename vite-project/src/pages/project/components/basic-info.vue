<template>
  <div class="basic-info-container">
    <el-card type="box-card">
        <template #header>
            <div class="card-header">基础信息</div>
        </template>
        <div>
            <el-form :model="basicInfoForm" :rules="rules" ref="basicform">
                <el-form-item prop="productId" label="产品号">
                    <el-select filterable clearable :remote="true" :remote-method="productRemoteMethod"  v-model="basicInfoForm.productId" placeholder="">
                      <el-option v-for="item in productOptions" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive } from "vue"
import type { FormRules } from 'element-plus'

// 下拉框类型
type Options = {
    label: string,
    value: string
}

const basicInfoForm = reactive({
    productId: ''
})
const rules = reactive<FormRules>({
    productId: [{required: true, message: '请选择产品号'}],
})

const productOptions = reactive<Array<Options>>([])
const productRemoteMethod = () => {

}

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
