import { Router } from 'express'
import { ExpendController } from '../controllers/expenses/expend-controller'
import { validateExpenseBody } from '../middlewares/validate-expenses-body'

const expenseRoute = Router()
const expendController = new ExpendController()

expenseRoute.post('/', validateExpenseBody, expendController.handle)

export { expenseRoute }
