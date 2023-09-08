import type { User } from './user'

export interface HttpError {
  response: {
    data: { message: string }
  }
}

export interface dataLogin {
  token: string
  user: User
}

export interface HttpResponseLogin {
  data: {
    data: dataLogin
    status: 'success' | 'error'
  }
}

export interface HttpResponseEmployes {
  data: {
    data: User[]
    total: number
    status: 'success' | 'error'
  }
}
