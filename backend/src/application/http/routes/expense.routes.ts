import { Router } from 'express'
import { ExpendController } from '../controllers/expenses/expend-controller'
import { validateExpenseBody } from '../middlewares/validate-expenses-body'
import { Authorization } from '../middlewares/ensure-auth'
import { FetchExpensesController } from '../controllers/expenses/fetch-controller'
import { FindExpenseController } from '../controllers/expenses/find-controller'
import { DeleteOneController } from '../controllers/expenses/delete-one-controller'

const expenseRoute = Router()
const authorization = new Authorization()

const expendController = new ExpendController()
const fetchExpensesController = new FetchExpensesController()
const findExpenseController = new FindExpenseController()
const deleteOneController = new DeleteOneController()

// protected routes
expenseRoute.post(
  '/',
  authorization.ensureAuth,
  validateExpenseBody,
  expendController.handle,
)
expenseRoute.get('/', authorization.ensureAuth, fetchExpensesController.handle)

expenseRoute.get(
  '/:expenseId',
  authorization.ensureAuth,
  findExpenseController.handle,
)
expenseRoute.delete(
  '/:expenseId',
  authorization.ensureAuth,
  deleteOneController.handle,
)

export { expenseRoute }
