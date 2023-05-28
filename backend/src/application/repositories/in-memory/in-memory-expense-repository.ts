import { Expense } from '../../modules/expense/entity/expense'
import { ExpenseRepository } from '../expense-repository'

export class InMemoryExpenseRepository implements ExpenseRepository {
  public readonly expenses: Expense[] = []

  async add(expense: Expense): Promise<Expense> {
    this.expenses.push(expense)
    return expense
  }

  async findMany(payerId: string): Promise<Expense[]> {
    return this.expenses.filter((expense) => expense.payerId === payerId)
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = this.expenses.find((expense) => expense.id === id)
    if (!expense) return null
    return expense
  }
}
