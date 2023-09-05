<template>
  <div class="login-container">
    <div class="module">
        <div class="left"></div>
        <div class="right">
            <div class="content">
                <div class="title">
                    <div class="system-name">账号登录</div>
                    <div class="tips">欢迎使用vue3框架的系统</div>
                </div>
                <div class="form">
                    <el-form :model="form">
                        <el-form-item>
                            <el-input v-model="form.name" placeholder="请输入账号" size="large">
                                <template #prepend>
                                    <el-icon><User /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.password" type="password" show-password placeholder="请输入登录密码" size="large">
                                <template #prepend>
                                    <el-icon><Lock /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="large" color="#2f54eb" type="primary" @click="login">登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-radio-group v-model="form.role" class="ml-4">
                                <el-radio :label="1">公司</el-radio>
                                <el-radio :label="0">普通</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue"
import { User, Lock } from '@element-plus/icons'
import { Login } from '@/interfaces/login'

const form: Login = reactive({
    name: '',
    password: '',
    role: 0
})

const login = () => {
    console.log('login', form, toRefs(form))
}
</script>

<style lang="scss" scoped>
.login {
    &-container {
        background-image: url('/src/assets/images/login-bg@2x.png');
        width: 100vw;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .module {
            width: 850px;
            height: 540px;
            border-radius: 10px;
            background-color: #fff;
            display: flex;
            .left {
                background-image: url('/src/assets/images/login-left.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                flex: 1;
            }
            .right {
                flex: 1;
                .content {
                    padding: 70px;
                    // display: flex;
                    // justify-content: start;
                    .title {
                        text-align: left;
                        .system-name {
                            font-size: 24px;
                            color: #2f54eb;
                            font-weight: 600;
                            margin-bottom: 4px;
                        }
                        .tips {
                            font-size: 12px;
                            height: 20px;
                            line-height: 20px;
                            color: #999ba3;
                            text-align: left;
                        }
                    }
                    .form {
                        margin-top: 80px;
                        ::v-deep .el-input-group__prepend {
                            padding: 0 12px;
                            .el-icon {
                                font-size: 16px;
                            }
                        }
                        .el-button {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
