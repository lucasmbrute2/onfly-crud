import { Notify } from 'quasar'
import { axiosInstance } from 'src/lib/axios'

interface authUserPayload {
	password: string
	username: string
}

interface AxiosError {
  message: string
}

export const authUserService = async (data:authUserPayload)=> {
  try {
    const response = await axiosInstance.post('/users/auth', data)
    localStorage.setItem('token', response?.data?.token)
    Notify.create('Sucess!')
  } catch (error) {
    Notify.create('error.message as string')
    console.error(error)
  }
}

