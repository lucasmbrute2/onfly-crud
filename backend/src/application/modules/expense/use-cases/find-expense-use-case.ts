import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { Forbidden, NotFoundError } from '@/src/shared/errors/global-errors'
import { Expense } from '../entity/expense'
import { inject, injectable } from 'tsyringe'

interface FindExpenseUseCaseProps {
  expenseId: string
  payerId: string
}

interface FindExpenseUseCaseResponse {
  expense: Expense
}

@injectable()
export class FindExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    expenseId,
    payerId,
  }: FindExpenseUseCaseProps): Promise<FindExpenseUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId)
    if (!payer) throw new NotFoundError('Payer not found')

    const expense = await this.expenseRepository.findById(expenseId)
    if (!expense) throw new NotFoundError('Expense not found')

    if (expense.payerId !== payer.id)
      throw new Forbidden('This user is not owner of this expense')

    return {
      expense,
    }
  }
}
