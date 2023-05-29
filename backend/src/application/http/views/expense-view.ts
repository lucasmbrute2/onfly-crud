import { ExpenseProps } from '../../modules/expense/entity/expense'
import { User } from '../../modules/user/entity/user'
import { UserView } from './user-view'

export class ExpenseView {
  static toHttp(expense: ExpenseProps): Partial<ExpenseProps> {
    const response: Partial<ExpenseProps> = {
      id: expense.id,
      cost: expense.cost,
      createdAt: expense.createdAt,
      description: expense.description,
    }

    if (expense.payer) {
      response.payer = UserView.toHttp(expense.payer) as User
    } else {
      response.payerId = expense.payerId
    }

    return response
  }
}
