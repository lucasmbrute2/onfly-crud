import { Router } from 'express'
import { ExpendController } from '../controllers/expenses/expend-controller'
import { validateExpenseBody } from '../middlewares/validate-expenses-body'
import { Authorization } from '../middlewares/ensure-auth'
import { FetchExpensesController } from '../controllers/expenses/fetch-controller'

const expenseRoute = Router()
const authorization = new Authorization()

const expendController = new ExpendController()
const fetchExpensesController = new FetchExpensesController()

// protected routes
expenseRoute.post(
  '/',
  authorization.ensureAuth,
  validateExpenseBody,
  expendController.handle,
)
expenseRoute.get('/', authorization.ensureAuth, fetchExpensesController.handle)

export { expenseRoute }
