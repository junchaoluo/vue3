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
        <div class="content-left"></div>
        <div class="content-right">
          <div>已选人员</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import { Search } from '@element-plus/icons-vue'

interface Props {
  visible: boolean,
  checkedUser?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  checkedUser: () => []
})
const { visible, checkedUser } = toRefs(props)
const dialogVisible = ref(false)
const checkedUserList = ref<Array<any>>([])
// 获取根节点部门的数据
const getDeptTree = () => {

}

watch([visible, checkedUser], ([newVisible, newCheckedUser], [oldVisible, oldCheckedUser]) => {
  console.log(newVisible, newCheckedUser, oldVisible, oldCheckedUser)
  dialogVisible.value = newVisible
  checkedUserList.value = newCheckedUser
  getDeptTree()
}, {
  immediate: true,
  deep: true
})

const keywords = ref('')

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
          flex: 1
        }
        .content-right {
          flex: 1;
          padding: 14px 24px;
          @include borderBottomOrTop('left');
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
