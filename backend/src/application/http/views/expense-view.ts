import { Expense } from '../../modules/expense/entity/expense'

export class ExpenseView {
  static toHttp(expense: Expense): Partial<Expense> {
    return {
      id: expense.id,
      cost: expense.cost,
      createdAt: expense.createdAt,
      description: expense.description,
      payerId: expense.payerId,
    }
  }
}
