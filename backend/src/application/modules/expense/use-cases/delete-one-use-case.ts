import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { Forbidden, NotFoundError } from '@/src/shared/errors/global-errors'

interface DeleteOneUseCaseProps {
  expenseId: string
  payerId: string
}

type DeleteOneUseCaseResponse = void

export class DeleteOneUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    expenseId,
    payerId,
  }: DeleteOneUseCaseProps): Promise<DeleteOneUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId, {
      expenses: true,
    })
    if (!payer) throw new NotFoundError('Payer not found')

    const expense = payer.expenses.find(
      (expense) => expense.payerId === payer.id,
    )
    if (!expense) throw new Forbidden('You have no access for this expense')
    await this.expenseRepository.deleteOne(expenseId)
  }
}
