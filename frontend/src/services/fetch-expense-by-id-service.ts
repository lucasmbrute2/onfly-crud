import { api } from 'src/boot/axios'
import { ExpenseModel } from './fetch-all-expenses-service'

export const findExpense = async (expenseId: string)=> {
  const token = localStorage.getItem('token')

  try {
    const response = await api.get<ExpenseModel>(`expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data

  } catch (error) {
    console.error(error)
  }
}

