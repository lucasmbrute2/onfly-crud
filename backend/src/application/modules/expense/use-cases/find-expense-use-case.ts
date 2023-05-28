import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'

interface FindExpenseUseCaseProps {
  expenseId: string
  payerId: string
}

interface FindExpenseUseCaseResponse {}

export class FindExpenseUseCase {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
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
  }
}
