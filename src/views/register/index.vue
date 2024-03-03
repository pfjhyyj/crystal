<template>
  <div class="container">
    <div class="content">
      <div class="register-form">
        <RegisterForm />
      </div>
      <div class="footer">
        <Footer class="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RegisterForm from './components/RegisterForm.vue'
import Footer from '@/components/footer/index.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/images/auth.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.register-form {
  padding: 20px;
  width: 360px;
  min-height: 340px;
  background-color: var(--color-bg-2);
  border-radius: 8px;
  align-items: center;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
