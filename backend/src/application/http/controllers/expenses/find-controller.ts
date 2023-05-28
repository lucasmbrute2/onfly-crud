import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseView } from '../../views/expense-view'
import { FindExpenseUseCase } from '@/src/application/modules/expense/use-cases/find-expense-use-case'

export class FetchExpensesController {
  async handle(req: Request, res: Response) {
    const { expenseId } = req.params
    const payerId = req.payerId

    const findExpenseUseCase = container.resolve(FindExpenseUseCase)
    const { expense } = await findExpenseUseCase.execute({
      payerId,
      expenseId,
    })

    return res.status(200).json({
      expenses: ExpenseView.toHttp(expense),
    })
  }
}
