<template>
  <el-dialog v-model="dialogVisible" title="选择人员" :close-on-click-modal="false" custom-class="user-choose-dialog">
    <div class="user-choose-container">
      <div class="header">
        <div class="title">vue3的公司</div>
        <div class="search">
          <el-input v-model="keywords" placeholder="点击快速输入成员" :suffix-icon="Search"/>
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <ul>
            <div class="back" @click="back" v-if="nextAndPreviousDepartment && nextAndPreviousDepartment.length > 0">
              {{`⬅返回上一级`}}
            </div>
            <template v-if="showUser">
              <li class="user" v-for="user in userData.list" @click="choose(user, 1)">
                <div class="avatar">
                  {{ user.name.slice(user.name.length - 1) }}
                </div>
                <div class="user-info">
                  <div class="name">{{ user.name }}({{ user.account }}})</div>
                  <div class="dept-name">{{ user.department.replaceAll(',', '/') }}</div>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="department" v-for="department in departments">
                <div class="department-left" @click="choose(department, 2)">
                  <el-icon><School /></el-icon>
                  <div>
                    {{department.name}}
                  </div>
                </div>
                <div class="department-right" @click="chooseNextDepartment(department)">
                  下级
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="content-right">
          <div>已选人员</div>
          <ul class="select">
            <li v-for="select in checkedUserList">
                <template v-if="select.type === 1">
                  <div class="user flex">
                    <div class="avatar">
                      {{ select.name.slice(select.name.length - 1) }}
                    </div>
                    <div class="user-info">
                      <div class="name">{{ select.name }}({{ select.account }}})</div>
                      <div class="dept-name">{{ select.department.replaceAll(',', '/') }}</div>
                    </div>
                  </div>
                </template>
                <template v-if="select.type === 2">
                  <div class="flex department">
                    <div class="dept-icon">
                      <el-icon><School /></el-icon>
                    </div>
                    <div class="dept-name">
                      {{ select.name || select.departName }}
                    </div>
                  </div>
                </template>
                <div class="delete" @click="deleteChoose(select)">
                  <el-icon><CloseBold /></el-icon>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import { Search, School, CloseBold } from '@element-plus/icons-vue'
import { getDeptTree, getUserList } from '@/api/user'

interface Props {
  visible: boolean,
  checkedUser?: Array<any>, // 已选的
  isSingle?: boolean, // 是否单选
  chooseType?: number // 选择的范围类型 0：所有（部门和用户） 1：所有部门 2：末级部门 3：用户 4：末级部门和用户
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isSingle: true,
  chooseType: 0,
  checkedUser: () => []
})
const { visible, checkedUser, isSingle, chooseType } = toRefs(props)
const emits = defineEmits(['confirm', 'close'])


const keywords = ref('')

const dialogVisible = ref(false)
const checkedUserList = ref<Array<any>>([])
const departments = ref([])
const userData = reactive({
  hasMore: true,
  list: [],
  pageIndex: 1,
  pageSize: 20
})
// 获取根节点部门的数据
const getDeptTreeData = async () => {
  const { result } = await getDeptTree()
  departments.value = result
}
// 根据部门查询用户数据
const getUserData = async (id: string) => {
  if(!userData.hasMore) return
  const { result } = await getUserList({
    departmentId: id,
    keywords: '',
    pageIndex: userData.pageIndex,
    pageSize: userData.pageSize
  })
  userData.list = result.list.map(item => {
    item.name = item.name || item.realName
    return item
  })
  if(result.total > userData.pageIndex * userData.pageSize){
    userData.hasMore = true
  }else{
    userData.hasMore = false
  }
}

watch([visible, checkedUser], ([newVisible, newCheckedUser], [oldVisible, oldCheckedUser]) => {
  dialogVisible.value = newVisible
  checkedUserList.value = newCheckedUser
  getDeptTreeData()
}, {
  immediate: true,
  deep: true
})

// 点击下级
const showUser = ref(false)
const nextAndPreviousDepartment = ref([])

const chooseNextDepartment = async (department) => {
  nextAndPreviousDepartment.value.push(departments.value)
  if(department.childNode){
    departments.value = department.childNode
    showUser.value = false
  }else{
    // 查询用户数据
    await getUserData(department.id)
    showUser.value = true
  }
}
// 点击上一级
const back = () => {
  departments.value= nextAndPreviousDepartment.value.pop()
  showUser.value = false
}

// 选中人员或者部门 type 1:人员 2:部门
const choose = (item, type) => {
  if(chooseType.value === 1 && type === 1) return
  if(chooseType.value === 2 && (type === 1 || (type === 2 && (!item.childNode)))) return
  if(chooseType.value === 3 && type === 2) return
  if(chooseType.value === 4 && (type === 2 && item.childNode.length > 0)) return
  if(isSingle.value) {
    checkedUserList.value = [{
      ...item,
      type: type
    }]
  }else{
    checkedUserList.value.push({
      ...item,
      type: type
    })
  }
}
// 删除人员
const deleteChoose = (item) => {
  let selectFilterList = checkedUserList.value.filter(select => select.id !== item.id)
  checkedUserList.value = selectFilterList
}

defineExpose({
  checkedUserList
})

const close = () => {
  emits('close')
}
// 确定
const confirm = () => {
  emits('confirm', checkedUserList.value)
}

</script>

<style lang="scss">
%title {
  line-height: 24px;
  font-size: 16px;
  color: #191b27;
  font-weight: 600;
}

@mixin borderBottomOrTop($borderPosition) {
  @if $borderPosition == 'bottom' {border-bottom: 1px solid #dcdee0}
  @if $borderPosition == 'top' {border-top: 1px solid #dcdee0}
  @if $borderPosition == 'left' {border-left: 1px solid #dcdee0}
}

%colorAndCursor {
  color: #999ba3;
  cursor: pointer;
}

%liStyle {
  list-style: none;
  height: 48px;
  box-sizing: border-box;
  padding: 8px 0 8px 24px;
  display: flex;
  align-items: center;
}

%userStyle {
  height: 56px;
    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: #c7d2ff;
      color: #2f54eb;
      font-size: 16px;
      text-align: center;
      line-height: 32px;
      font-weight: 600;
      margin-right: 8px;
    }
    .user-info {
      .name,
      .dept-name {
        height: 24px;
        line-height: 24px;
        color: #191b27;
      }
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .dept-name {
        font-size: 12px;
      }
    }
}

.flex {
  display: flex;
  align-items: center;
}

.user-choose-dialog {
  margin-top: 60px;
  margin-bottom: 60px;
  text-align: left;
  .el-dialog__header {
    @include borderBottomOrTop('bottom');
    margin-right: 0;
    text-align: left;
    padding: 12px;
    .el-dialog__title {
      @extend %title
    }
  }
  .el-dialog__body {
    padding: 0;
    .user-choose-container {
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        box-sizing: border-box;
        padding: 9px 24px;
        background-color: #f7f8fa;
        @include borderBottomOrTop('bottom');
        .title {
          @extend %title
        }
      }
      .content {
        height: calc(100vh - 283px);
        display: flex;
        // overflow-y: auto;
        .content-left {
          flex: 1;
          ul {
            height: 100%;
            margin: 0;
            overflow-y: auto;
            min-height: 100%;
            padding: 0;
            padding-top: 14px;
            box-sizing: border-box;
            .back {
                @extend %colorAndCursor;
                padding: 8px 0 8px 24px;
            }
            li {
              @extend %liStyle;
              &:hover {
                background-color: #f0f3ff;
                cursor: pointer;
              }
              &.user {
                @extend %userStyle;
              }
              &.department {
                justify-content: space-between;
                .department-left {
                  display: flex;
                  align-items: center;
                }
                .department-right {
                  @extend %colorAndCursor;
                  margin-right: 24px;
                }
              }
            }
          }
        }
        .content-right {
          flex: 1;
          padding: 14px 24px;
          @include borderBottomOrTop('left');
          height: 100%;
          overflow-y: auto;
          box-sizing: border-box;
          .select {
            margin: 0;
            padding: 0;
            li {
              @extend %liStyle;
              padding-left: 0;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #ccc;
              height: auto;
              .delete {
                cursor: pointer;
              }
              .user {
                @extend %userStyle;
                // height: 48px;
                display: flex;
                align-items: center;
              }
              .department {
                .dept-icon {
                  line-height: 28px;
                  height: 28px;
                  .el-icon {
                    font-size: 28px;
                    margin-right: 8px;
                  }
                }
                .dept-name {
                  font-size: 16px;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
    }
  }
  .el-dialog__footer {
    padding: 8px;
    @include borderBottomOrTop('top');
  }
}

</style>
