import { Router } from 'express'
import { ExpendController } from '../controllers/expenses/expend-controller'
import { validateExpenseBody } from '../middlewares/validate-expenses-body'
import { Authorization } from '../middlewares/ensure-auth'

const expenseRoute = Router()
const expendController = new ExpendController()
const authorization = new Authorization()

// protected routes
expenseRoute.post(
  '/',
  authorization.ensureAuth,
  validateExpenseBody,
  expendController.handle,
)

export { expenseRoute }
