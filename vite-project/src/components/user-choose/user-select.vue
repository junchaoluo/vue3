<template>
  <div class="user-select-container">
    <el-select
        v-model="userList"
        :multiple="multiple"
        :placeholder="placeholder"
        :remote="true"
        :loading="loading"
        filterable
        :reserve-keyword="false"
        value-key="id"
        :clearable="true"
        :remote-method="remoteMethod"
        @change="changeUser"
        >
        <el-option
            v-for="item in userData.list"
            :key="item.id"
            :label="item.realName || item.name"
            :value="item"
        >
        <span>{{ item.realName || item.name }}</span>
        </el-option>
    </el-select>
  </div>
</template>

<script setup lang="tsx">
import useSelectUser from '@/components/user-choose/useSelectUser'

const {userData, loading, remoteMethod, defaultUsers} = useSelectUser()

interface Props {
    placeholder?: string,
    multiple?: boolean,
    users: Array<any>
}

const props = withDefaults(defineProps<Props>(),{
    placeholder: '请选择用户',
    multiple: true,
    users: () => []
})
const { placeholder, users } = toRefs(props)
const emit = defineEmits(['handleChange'])

const userList = ref<Array<any>>([])
watch(users, (newV, oldV) => {
    userList.value = newV
    defaultUsers(newV)
}, {
    immediate: true,
    deep: true
})

const changeUser = (e) => {
    emit('handleChange', userList)
}

</script>

<style lang="scss" scoped></style>
