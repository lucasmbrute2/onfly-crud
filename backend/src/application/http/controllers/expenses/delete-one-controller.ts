import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteOneUseCase } from '@/src/application/modules/expense/use-cases/delete-one-use-case'

export class DeleteOneController {
  async handle(req: Request, res: Response) {
    const { expenseId } = req.params
    const payerId = req.payerId

    const deleteOneUseCase = container.resolve(DeleteOneUseCase)
    await deleteOneUseCase.execute({
      payerId,
      expenseId,
    })

    return res.status(200).send()
  }
}
