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
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    payerId,
  }: FetchExpensesUseCaseProps): Promise<FetchExpensesUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId, {
      expenses: true,
    })
    if (!payer) throw new NotFoundError('Payer not found')

    const expenses = payer.expenses
    return {
      expenses,
    }
  }
}
