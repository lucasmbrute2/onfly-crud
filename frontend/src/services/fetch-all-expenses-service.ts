import { axiosInstance } from 'src/lib/axios'

const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

export const fetchExpenses = async ()=> {
  const token = localStorage.getItem('token')

  try {
    const response = await axiosInstance.get('/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data.expenses)
    return { ...response.data.expenses, createdAt: '' }
  } catch (error) {
    console.error(error)
  }
}

