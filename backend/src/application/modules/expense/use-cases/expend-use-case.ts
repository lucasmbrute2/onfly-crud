import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { Expense } from '../entity/expense'
import { inject, injectable } from 'tsyringe'
import { Mail } from '@/src/application/repositories/mail'

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
    @inject('Mailer')
    private readonly mailProvider: Mail,
  ) {}

  async execute({
    cost,
    description,
    payerId,
  }: ExpendUseCaseProps): Promise<ExpendUseCaseResponse> {
    const hasValidPayer = await this.userRepository.findById(payerId)
    if (!hasValidPayer) throw new NotFoundError('Invalid payer')

    const expense = new Expense({
      cost,
      description,
      payerId,
    })

    await this.expenseRepository.add(expense)

    const { name, username } = hasValidPayer
    const context = {
      name,
    }
    await this.mailProvider.sendMail({
      context,
      subject: 'New expense',
      to: username,
    })

    return {
      expense,
    }
  }
}
