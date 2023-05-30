import { api } from 'src/boot/axios'
import { Expense } from './fetch-all-expenses-service'

export const updateExpense = async (expenseId: string, data: Partial<Expense>)=> {
  const { cost, description } = data
  const token = localStorage.getItem('token')
  try {
    const response = await api.patch(`expenses/${expenseId}`, {
      cost,
      description
    } , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data

  } catch (error) {
    console.error(error)
  }
}
