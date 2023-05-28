import { PrismaClient } from '@prisma/client'
import { injectable } from 'tsyringe'
import { ExpenseRepository } from '../expense-repository'
import { Expense } from '../../modules/expense/entity/expense'
import { PrismaExpenseMapper } from './mappers/expense-mapper'

@injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  private readonly prisma = new PrismaClient()

  async add(expense: Expense): Promise<Expense> {
    const expenseFromPrisma = await this.prisma.expense.create({
      data: PrismaExpenseMapper.toPrisma(expense),
    })

    return PrismaExpenseMapper.toDomain(expenseFromPrisma)
  }
}
