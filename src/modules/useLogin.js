import { ref } from 'vue'
import http from '@/services/http.js'
import useFormValidation from '@/modules/useFormValidation'
import { useAuth } from '@/stores/auth.js'
import router from '@/router'

export default function useLogin(user) {
  let loginError = ref('')
  const auth = useAuth()

  const { validatePasswordField, validateEmailField, errors } = useFormValidation()

  const validateForm = () => {
    validateEmailField('email', user.correo)
    validatePasswordField('password', user.password)
  }
  const hasErrors = () => {
    validateForm()
    let withErrors = false
    for (let prop in user) {
      if (!user[prop] || errors[prop]) {
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
      } = await http.post('auth/login', user)

      if (status === 'success') {
        auth.setToken(data.token)
        auth.setUser(data.user.nombre)
        router.push({ path: '/dashboard' })
      }
    } catch (error) {
      loginError.value = error?.response?.data.message
    }
  }

  return { errors, loginError, validateInputEmail, validateInputPassword, login }
}
