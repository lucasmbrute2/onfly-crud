import { ExpendUseCase } from '@/src/application/modules/expense/use-cases/expend-use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseView } from '../../views/expense-view'

export class ExpendController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { description, payerId, cost } = req.body

    const expendUseCase = container.resolve(ExpendUseCase)
    const { expense } = await expendUseCase.execute({
      cost,
      description,
      payerId,
    })

    return res.status(200).json({
      expense: ExpenseView.toHttp(expense),
    })
  }
}
