import { Expense } from '../modules/expense/entity/expense'

export interface ExpenseRepository {
  add(expense: Expense): Promise<Expense | null>
}
