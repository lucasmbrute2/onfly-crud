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
    console.log(response)

    Notify.create('Sucess!')
  } catch (error) {

    console.log(error)
    // eslint-disable-next-line
    // @ts-ignore
    Notify.create(error?.response?.data)
    console.error(error)
  }
}

