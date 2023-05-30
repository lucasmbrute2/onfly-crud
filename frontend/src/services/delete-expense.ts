import { api } from 'src/boot/axios'

export async function deleteExpense(expenseId: string) {
  const token = localStorage.getItem('token')

  try {
    await api.delete(`/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error)
  }
}
