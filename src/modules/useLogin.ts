import { ref } from 'vue'
import http from '@/services/http'
import useFormValidation from '@/modules/useFormValidation'
import { useAuth } from '@/stores/auth.js'
import router from '@/router'
import type { User } from '@/interfaces/user'
import type { AxiosError } from 'axios'
import type { HttpResponseLogin } from '@/interfaces/http'

export default function useLogin(user: User) {
  const loginError = ref('')
  const auth = useAuth()

  const { validatePasswordField, validateEmailField, errors } = useFormValidation()

  const validateForm = () => {
    validateEmailField('email', user.correo)
    validatePasswordField('password', user.password)
  }
  const hasErrors = () => {
    validateForm()
    let withErrors = false
    for (const prop in user) {
      if (errors[prop]) {
        withErrors = true
        break
      }
      withErrors = false
    }
    return withErrors
  }

  const validateInputEmail = () => {
    loginError.value = ''
    validateEmailField('email', user.correo)
  }

  const validateInputPassword = () => {
    loginError.value = ''
    validatePasswordField('password', user.password)
  }

  async function login() {
    if (hasErrors()) return
    try {
      const {
        data: { data, status }
      }: HttpResponseLogin = await http.post('auth/login', user)

      if (status === 'success') {
        auth.setToken(data.token)
        auth.setUser(data.user.nombre)
        router.push({ path: '/dashboard' })
      }
    } catch (err) {
      const error = err as AxiosError<Error>
      loginError.value = error?.response?.data.message || ''
    }
  }

  return { errors, loginError, validateInputEmail, validateInputPassword, login }
}
