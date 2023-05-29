import { Expense } from '@/src/application/modules/expense/entity/expense'
import { User } from '@/src/application/modules/user/entity/user'
import {
  Expense as PrismaExpenseEntity,
  User as PrismaUser,
} from '@prisma/client'

interface ExpenseWithUser extends PrismaExpenseEntity {
  User?: PrismaUser
}

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

  static toDomain = (expense: ExpenseWithUser): Expense => {
    let payer = null
    if (expense?.User) {
      payer = new User(expense.User)
    }

    return new Expense({
      id: expense.id,
      cost: expense.cost,
      description: expense.description,
      payerId: expense.userId,
      createdAt: expense.createdAt,
      payer,
    })
  }
}
