import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { Expense, ExpenseProps } from '../entity/expense'
import { inject, injectable } from 'tsyringe'
import { ExpenseRepository } from '@/src/application/repositories/expense-repository'

interface UpdateOneExpenseUseCaseProps {
  expenseId: string
  payerId: string
  data: Partial<ExpenseProps>
}

interface UpdateOneExpenseUseCaseResponse {
  expense: Expense
}

@injectable()
export class UpdateOneExpenseUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    expenseId,
    payerId,
    data,
  }: UpdateOneExpenseUseCaseProps): Promise<UpdateOneExpenseUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId, {
      expenses: true,
    })
    if (!payer) throw new NotFoundError('Payer not found')

    const expense = payer.expenses.find((expense) => expense.id === expenseId)
    if (!expense) throw new NotFoundError('Expense not found')

    const updatedExpense = await this.expenseRepository.save(
      new Expense({
        id: expense.id,
        createdAt: expense.createdAt,
        payerId,
        cost: Number(data?.cost),
        description: data?.description,
      }),
    )

    return {
      expense: updatedExpense,
    }
  }
}
