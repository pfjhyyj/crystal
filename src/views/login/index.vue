<template>
  <div class="container">
    <div class="content">
      <div class="login-form">
        <LoginForm />
      </div>
      <div class="footer">
        <footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/login-form.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
