import { FetchExpensesUseCase } from '@/src/application/modules/expense/use-cases/fetch-expenses-use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseView } from '../../views/expense-view'

export class FetchExpensesController {
  async handle(req: Request, res: Response) {
    const payerId = req.payerId
    const fetchExpensesUseCase = container.resolve(FetchExpensesUseCase)
    const { expenses } = await fetchExpensesUseCase.execute({
      payerId,
    })

    return res.status(200).json({
      expenses: expenses.map(ExpenseView.toHttp),
    })
  }
}
