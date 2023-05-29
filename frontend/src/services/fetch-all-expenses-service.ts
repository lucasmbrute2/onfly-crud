import { api } from 'src/boot/axios'

interface ExpenseModel {
	expenses: [
		{
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
	]
}

export const fetchExpenses = async ()=> {
  const token = localStorage.getItem('token')

  try {
    const response = await api.get<ExpenseModel>('/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.expenses
  } catch (error) {
    console.error(error)
  }
}

