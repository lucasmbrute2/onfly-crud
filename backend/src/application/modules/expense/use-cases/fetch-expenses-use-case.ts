import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { Expense } from '../entity/expense'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { inject, injectable } from 'tsyringe'

interface FetchExpensesUseCaseProps {
  payerId: string
}

interface FetchExpensesUseCaseResponse {
  expenses: Expense[]
}

@injectable()
export class FetchExpensesUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    payerId,
  }: FetchExpensesUseCaseProps): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.userRepository.findById(payerId)
    if (!user) throw new NotFoundError('Payer not found')

    const expenses = await this.expenseRepository.findMany(payerId)
    return {
      expenses,
    }
  }
}
