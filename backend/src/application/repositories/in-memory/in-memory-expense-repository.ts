import { Expense } from '../../modules/expense/entity/expense'
import { ExpenseRepository } from '../expense-repository'

export class InMemoryExpenseRepository implements ExpenseRepository {
  public readonly expenses: Expense[] = []
  async add(expense: Expense): Promise<Expense> {
    this.expenses.push(expense)
    return expense
  }
}
