<template v-if="!auth.isAuthenticated">
  <div class="login-wrapper">
    <div class="login-left">
      <img class="login-image" src="./../assets/imgs/login.png" alt="login-image" />
      <div class="login-bottom">
        <img src="./../assets/imgs/logo.svg" alt="logo" />
        <h1>Dale más power ⚡ a tus empleados hoy 💪</h1>
        <p>Te ayudamos a gestionarlos de manera más sencilla</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form">
        <h4>Inicia sesión</h4>
        <form @submit.prevent="login" novalidate>
          <div class="form-item">
            <label for="">Correo electrónico <span>*</span></label>
            <input
              v-model="user.correo"
              @keyup="validateInputEmail"
              @blue="validateInputEmail"
              type="text"
              class="field"
              placeholder="Ingrese el correo electrónico"
            />
            <span class="input-error" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-item">
            <label for="">Contraseña <span>*</span></label>
            <input
              class="field"
              v-model="user.password"
              @keyup="validateInputPassword"
              @blue="validateInputPassword"
              type="password"
              placeholder="Ingrese la contraseña"
            />
            <span class="input-error" v-if="errors.password">{{ errors.password }}</span>
          </div>
          <div class="form-item">
            <span class="input-error login-error" v-if="loginError">{{ loginError }}</span>

            <button class="button" type="submit">Iniciar sesión</button>
          </div>
          <p class="login-register-link paragraph">
            ¿Eres nuevo aquí? <a href="">Crea una cuenta</a>
          </p>
        </form>
      </div>
      <div class="login-footer">
        <p class="paragraph">© 2023 Culqi . Todos los derechos reservados</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  width: 100%;
  display: flex;

  @media (min-width: 1024px) {
    width: 1440px;
    margin: 0 auto;
  }
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
  position: relative;
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
.login-register-link {
  text-align: center;
}
.login-footer {
  position: absolute;
  top: calc(100% - 60px);
}

.login-footer .paragraph {
  text-align: center;
}

.login-form {
  width: 480px;
}
.login-form h4 {
  text-align: center;
  margin-bottom: 40px;
}

.login-error {
  margin: 0 0 20px 5px;
}
</style>

<script setup>
import { reactive } from 'vue'
import useLogin from '@/modules/useLogin'

const user = reactive({
  correo: '',
  password: ''
})

const { validateInputEmail, validateInputPassword, errors, loginError, login } = useLogin(user)
</script>
