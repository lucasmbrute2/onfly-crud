import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { BadRequestError } from '@/src/shared/errors/global-errors'
import { Expense } from '../entity/expense'

interface ExpendUseCaseProps {
  description: string
  cost: number
  payerId: string
}

export class ExpendUseCase {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ cost, description, payerId }: ExpendUseCaseProps) {
    const hasValidPayer = await this.userRepository.findById(payerId)
    if (!hasValidPayer) throw new BadRequestError('Invalid payer')
  }
}
