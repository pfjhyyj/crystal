<template>
  <div class="tab">
    <a-list :bordered="false">
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-typography-paragraph> 登录密码 </a-typography-paragraph>
          </template>
          <template #description>
            <div class="content">
              <a-typography-paragraph>
                密码至少6位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。
              </a-typography-paragraph>
            </div>
            <div class="operation">
              <a-link @click="handleChangePassword">修改</a-link>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <PasswordDialog ref="passwordDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PasswordDialog from './PasswordDialog.vue'

const passwordDialog = ref<typeof PasswordDialog>()

const handleChangePassword = () => {
  passwordDialog.value?.open()
}
</script>

<style lang="scss" scoped>
:deep(.arco-list-item) {
  border-bottom: none !important;
  .arco-typography {
    margin-bottom: 20px;
  }
  .arco-list-item-meta-avatar {
    margin-bottom: 1px;
  }
  .arco-list-item-meta {
    padding: 0;
  }
}
:deep(.arco-list-item-meta-content) {
  flex: 1;
  border-bottom: 1px solid var(--color-neutral-3);

  .arco-list-item-meta-description {
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    .tip {
      color: rgb(var(--gray-6));
    }
    .operation {
      margin-right: 6px;
    }
  }
}
</style>
