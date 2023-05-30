import { api } from 'src/boot/axios'
import { dateToAmerican } from 'src/helpers/formatt-date'

export interface Expense {
  id: string
  cost: number
  createdAt: Date | string
  description: string
  payer: {
    id: string
    name: string,
    username: string
  }
}

export interface ExpenseModel {
	expenses: Expense[]
}

export const fetchExpenses = async ()=> {
  const token = localStorage.getItem('token')

  try {
    const response = await api.get<ExpenseModel>('/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.expenses.map(expense => {
      if (expense) {
        expense.createdAt = dateToAmerican(new Date(expense.createdAt))
      }
      return expense
    })
  } catch (error) {
    console.error(error)
  }
}

