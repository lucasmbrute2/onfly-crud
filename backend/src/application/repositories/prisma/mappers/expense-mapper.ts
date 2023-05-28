import { Expense } from '@/src/application/modules/expense/entity/expense'
import { Expense as PrismaExpenseEntity } from '@prisma/client'

export class PrismaExpenseMapper {
  static toPrisma = (expense: Expense): PrismaExpenseEntity => {
    return {
      id: expense.id,
      cost: expense.cost,
      createdAt: expense.createdAt,
      description: expense.description,
      userId: expense.payerId,
    }
  }

  static toDomain = (expense: PrismaExpenseEntity): Expense => {
    return new Expense({
      id: expense.id,
      cost: expense.cost,
      description: expense.description,
      payerId: expense.userId,
      createdAt: expense.createdAt,
    })
  }
}
