import { Router } from 'express'
import { userRouter } from './user.routes'
import { expenseRoute } from './expense.routes'
const route = Router()

route.use('/users', userRouter)
route.use('/expenses', expenseRoute)

export { route }
