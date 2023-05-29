import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { Forbidden, NotFoundError } from '@/src/shared/errors/global-errors'
import { inject, injectable } from 'tsyringe'

interface DeleteOneUseCaseProps {
  expenseId: string
  payerId: string
}

type DeleteOneUseCaseResponse = void

@injectable()
export class DeleteOneUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('ExpenseRepository')
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

    const expense = payer.expenses.find((expense) => expense.id === expenseId)
    if (!expense) throw new Forbidden('Expense not found')

    await this.expenseRepository.deleteOne(expenseId)
  }
}
