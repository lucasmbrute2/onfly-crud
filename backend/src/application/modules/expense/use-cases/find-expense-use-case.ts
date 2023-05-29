import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'
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
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    expenseId,
    payerId,
  }: FindExpenseUseCaseProps): Promise<FindExpenseUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId, {
      expenses: true,
    })
    if (!payer) throw new NotFoundError('Payer not found')

    const expense = payer.expenses.find((expense) => expense.id === expenseId)
    if (!expense) throw new NotFoundError('Expense not found')

    return {
      expense,
    }
  }
}
