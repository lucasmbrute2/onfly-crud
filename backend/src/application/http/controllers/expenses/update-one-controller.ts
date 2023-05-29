import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseView } from '../../views/expense-view'
import { UpdateOneExpenseUseCase } from '@/src/application/modules/expense/use-cases/update-one-use-case'

export class UpdateOneExpenseController {
  async handle(req: Request, res: Response) {
    const { expenseId } = req.params
    const payerId = req.payerId
    const data = req.body

    const AVAILABLE_DATA_TO_BE_UPDATED = ['description']

    const hasSomeUnavailableData = Object.keys(data).some(
      (val) => !AVAILABLE_DATA_TO_BE_UPDATED.includes(val),
    )

    if (hasSomeUnavailableData)
      return res.status(409).json({
        message: `Only ${AVAILABLE_DATA_TO_BE_UPDATED[0]} can be updated`,
      })

    const updateOneExpenseUseCase = container.resolve(UpdateOneExpenseUseCase)
    const { expense } = await updateOneExpenseUseCase.execute({
      payerId,
      expenseId,
      data,
    })

    return res.status(200).json({
      expenses: ExpenseView.toHttp(expense),
    })
  }
}
