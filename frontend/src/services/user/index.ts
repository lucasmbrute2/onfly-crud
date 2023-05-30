import { api } from 'src/boot/axios'

interface userPayolad {
  name: string
  password: string
  confirmPassword: string
  username: string
}

interface authUserPayload {
	password: string
	username: string
}

export function useUserApi(){
  async function addUser (data:userPayolad) {
    await api.post('/users', data)
  }

  async function authUser(data:authUserPayload) {
    const response = await api.post('/users/auth', data)
    localStorage.setItem('token', response?.data?.token)
  }

  return {
    addUser,
    authUser
  }
}
