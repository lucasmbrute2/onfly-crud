import { api } from 'src/boot/axios'

interface userPayolad {
	name: string
	password: string
	confirmPassword: string
	username: string
}

export const addUserService = async (data:userPayolad)=> {
  try {
    const response = await api.post('/users', data)

  } catch (error) {
    console.error(error)
  }
}

