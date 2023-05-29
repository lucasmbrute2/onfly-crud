import { Expense } from '@/src/application/modules/expense/entity/expense'
import { User } from '@/src/application/modules/user/entity/user'
import {
  User as PrismaUserEntity,
  Expense as PrismaExpense,
} from '@prisma/client'

interface UserWithExpense extends PrismaUserEntity {
  expenses?: PrismaExpense[]
}

export class PrismaUserMapper {
  static toPrisma = (user: User): PrismaUserEntity => {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      username: user.username,
    }
  }

  static toDomain = (user: UserWithExpense): User => {
    const response = new User({
      id: user.id,
      name: user.name,
      password: user.password,
      username: user.username,
    })

    if (user?.expenses) {
      response.expenses = user.expenses.map(
        (exp) =>
          new Expense({
            ...exp,
            payerId: user.id,
          }),
      )
    }

    return response
  }
}
