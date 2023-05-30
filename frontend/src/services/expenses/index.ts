import { api } from 'src/boot/axios'
import { dateToAmerican } from 'src/helpers/format-date'
import { formatCurrency } from 'src/helpers/format-price'

export interface Expense {
  id: string
  cost: string
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


export function useExpenseApi () {
  const token = localStorage.getItem('token')

  async function getExpenses() {
    const response = await api.get<ExpenseModel>('/expenses', {
    headers: {
      Authorization: `Bearer ${token}`
    }
    })
    return response.data.expenses.map(expense => {
      if (expense) {
        expense.createdAt = dateToAmerican(new Date(expense.createdAt))
        expense.cost = formatCurrency(Number(expense.cost))
      }
      return expense
    })
  }

  async function findExpense (expenseId: string) {
    const response = await api.get<ExpenseModel>(`expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }

  async function updateExpense (expenseId: string, data: Partial<Expense>) {
    const { cost, description } = data
    const response = await api.patch(`expenses/${expenseId}`, {
      cost,
      description
    } , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }

  async function addExpense(data: ExpenseModel) {
    const token = localStorage.getItem('token')
    const response =  await api.post<ExpenseModel>('/expenses', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  }


  async function deleteExpense(expenseId: string) {
    await api.delete(`/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return {
    getExpenses,
    findExpense,
    updateExpense,
    addExpense,
    deleteExpense
  }
}
