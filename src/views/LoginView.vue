<script setup></script>

<template v-if="!auth.isAuthenticated">
  <div class="login-wrapper">
    <div class="login-left">
      <img class="login-image" src="./../assets/imgs/login.png" alt="" srcset="" />
      <div class="login-bottom">
        <img src="./../assets/imgs/logo.svg" alt="" srcset="" />
        <h1>Dale más power ⚡ a tus empleados hoy 💪</h1>
        <p>Te ayudamos a gestionarlos de manera más sencilla</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form">
        <h4>Inicia sesión</h4>
        <form @submit.prevent="login">
          <div class="form-item">
            <label for="">Correo electrónico <span>*</span></label>
            <input v-model="user.correo" type="text" placeholder="Ingrese el correo electrónico" />
          </div>
          <div class="form-item">
            <label for="">Contraseña <span>*</span></label>
            <input v-model="user.password" type="password" placeholder="Ingrese la contraseña" />
          </div>
          <div class="form-item">
            <button type="submit">Iniciar sesión</button>
          </div>
          <p class="form-text-register">¿Eres nuevo aquí? <a href="">Crea una cuenta</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  width: 100%;
  display: flex;
}
.login-left {
  display: flex;
  flex-direction: column;
}
.login-left,
.login-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-image {
  width: 100%;
  max-width: 720px;
}
.login-bottom {
  border-top: 5px solid #27a376;
  background: #111827;
  padding: 50px 50px 25px 50px;
}

.login-bottom p {
  font-weight: 400;
  color: white;
  line-height: 27px;
}

.login-form {
  width: 480px;
}
.login-form h4 {
  text-align: center;
}
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}
.form-item input,
.form-item button {
  padding: 16px 20px;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #e9eaec;
  font-weight: 400;
  font-size: 14px;
  line-height: 22.4px;
}
.form-item input::placeholder {
  color: #a0aec0;
}
.form-item input:focus-visible {
  border-color: #0caf60;
}
.form-item label {
  font-weight: 500;
  font-size: 14px;
  line-height: 22.4px;
  color: #111827;
  margin-bottom: 10px;
}
.form-item label span {
  color: red;
}

.form-item button {
  background: #111827;
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
}

.form-text-register {
  font-weight: 500;
  font-size: 14px;
  color: #a0aec0;
  line-height: 22.4px;
  text-align: center;
}
.form-text-register a {
  color: #27a376;
  font-size: 14px;
  text-decoration: none;
}
</style>

<script setup>
import http from '@/services/http.js'
import { reactive } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth.js'

const auth = useAuth()

const user = reactive({
  correo: 'c.quispe@culqi.com',
  password: 'admin123'
})

async function login() {
  try {
    const { data } = await http.post('auth/login', user)

    if (data.status === 'success') {
      auth.setToken(data.data.token)
      auth.setUser(data.data.user.nombre)
      router.push({ path: '/dashboard' })
    }
  } catch (error) {
    console.log(error?.response?.data)
  }
}
</script>
