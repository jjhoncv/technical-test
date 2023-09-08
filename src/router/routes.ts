import { useAuth } from '@/stores/auth.js'
import type { RouteLocationNormalized } from 'vue-router'

export default async function routes(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: Function
) {
  const auth = useAuth()
  const isLogged = auth.token && auth.user

  let route = isLogged ? { name: 'dashboard' } : null
  if (to.meta?.auth) {
    route = isLogged ? null : { name: 'login' }
  }

  next(route)
  return
}
