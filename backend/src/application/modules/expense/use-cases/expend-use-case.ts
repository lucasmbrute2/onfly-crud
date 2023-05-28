import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { BadRequestError } from '@/src/shared/errors/global-errors'
import { Expense } from '../entity/expense'
import { inject, injectable } from 'tsyringe'

interface ExpendUseCaseProps {
  description: string
  cost: number
  payerId: string
}

interface ExpendUseCaseResponse {
  expense: Expense
}

@injectable()
export class ExpendUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    cost,
    description,
    payerId,
  }: ExpendUseCaseProps): Promise<ExpendUseCaseResponse> {
    const hasValidPayer = await this.userRepository.findById(payerId)
    if (!hasValidPayer) throw new BadRequestError('Invalid payer')

    const expense = new Expense({
      cost,
      description,
      payerId,
    })

    await this.expenseRepository.add(expense)
    return {
      expense,
    }
  }
}
