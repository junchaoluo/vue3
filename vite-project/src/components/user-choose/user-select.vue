<template>
  <div class="user-select-container">
    <el-select
      v-model="userList"
      multiple
      placeholder="请选择用户"
      :remote="true"
      :loading="selectUser.loading"
      filterable
      value-key="id"
      :remote-method="selectUser.remoteMethod"
      @change="changeUser"
    >
        <el-option
            v-for="item in selectUser.userData.list"
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
import useSelectUser from './useSelectUser'

const selectUser = useSelectUser()

interface Props {
    placeholder?: string,
    users: Array
}

const props = withDefaults(defineProps<Props>(),{
    placeholder: '请选择用户',
    users: () => []
})
const { placeholder, users } = toRefs(props)

const userList = ref<Array<any>>([])
watch(users, (newV, oldV) => {
    userList.value = users
}, {
    immediate: true
})

const changeUser = (user) => {
    userList.value.push(user)
}

</script>

<style lang="scss" scoped></style>
