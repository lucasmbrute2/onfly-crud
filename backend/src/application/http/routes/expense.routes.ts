import { Router } from 'express'
import { ExpendController } from '../controllers/expenses/expend-controller'

const expenseRoute = Router()
const expendController = new ExpendController()

expenseRoute.post('/', expendController.handle)

export { expenseRoute }
