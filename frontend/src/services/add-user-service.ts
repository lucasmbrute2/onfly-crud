import { axiosInstance } from 'src/lib/axios'

interface userPayolad {
	name: string
	password: string
	confirmPassword: string
	username: string
}

export const addUserService = async (data:userPayolad)=> {
  try {
    const response = await axiosInstance.post('/users', data)

  } catch (error) {
    console.error(error)
  }
}

