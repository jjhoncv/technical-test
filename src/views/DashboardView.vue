<template>
  <div>Dashboard</div>
  <p>{{ auth.fullName }}</p>
  <button @click="logout">Salir</button>
</template>
<script setup>
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const logout = () => {
  auth.clear()
  router.push({ name: 'login' })
}
</script>

<style scoped></style>
