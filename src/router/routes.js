import { useAuth } from '@/stores/auth.js'

export default async function routes(to, from, next) {
  const auth = useAuth()
  const isLogged = auth.token && auth.user

  let route = isLogged ? { name: 'dashboard' } : null
  if (to.meta?.auth) {
    route = isLogged ? null : { name: 'login' }
  }

  next(route)
  return
}
