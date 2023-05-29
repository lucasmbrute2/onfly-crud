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

  async findMany(payerId: string): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId: payerId,
      },
      include: {
        User: true,
      },
    })

    return expenses.map(PrismaExpenseMapper.toDomain)
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    })

    if (!expense) return null
    return PrismaExpenseMapper.toDomain(expense)
  }

  async deleteOne(id: string): Promise<void> {
    await this.prisma.expense.delete({
      where: {
        id,
      },
    })
  }
}
