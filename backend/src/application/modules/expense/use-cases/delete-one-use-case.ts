import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { NotFoundError } from '@/src/shared/errors/global-errors'

interface DeleteOneUseCaseProps {
  expenseId: string
  payerId: string
}

type DeleteOneUseCaseResponse = void

export class DeleteOneUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    expenseId,
    payerId,
  }: DeleteOneUseCaseProps): Promise<DeleteOneUseCaseResponse> {
    const payer = await this.userRepository.findById(payerId)
    if (!payer) throw new NotFoundError('Payer not found')
  }
}
