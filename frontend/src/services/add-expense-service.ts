import { api } from 'src/boot/axios'
import { ExpenseModel } from './fetch-all-expenses-service'


export const addExpense = async (data: ExpenseModel)=> {
  const token = localStorage.getItem('token')

  try {
    await api.post<ExpenseModel>('/expenses', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error)
  }
}
