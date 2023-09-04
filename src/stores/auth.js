import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')))

  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue) {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value
  })

  const fullName = computed(() => {
    if (user.value) {
      return user.value
    }
    return ''
  })

  function clear() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = ''
    user.value = ''
  }

  return {
    token,
    user,
    setToken,
    setUser,
    isAuthenticated,
    fullName,
    clear
  }
})
