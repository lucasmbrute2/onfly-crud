import { Notify } from 'quasar'
import { api } from 'src/boot/axios'

interface authUserPayload {
	password: string
	username: string
}

export const authUserService = async (data:authUserPayload)=> {
  try {
    const response = await api.post('/users/auth', data)
    localStorage.setItem('token', response?.data?.token)

    Notify.create({
      message: 'Bem-vindo!',
      icon: 'check',
      color: 'positive'
    })
  } catch (error) {
    console.log(error)
  }
}

