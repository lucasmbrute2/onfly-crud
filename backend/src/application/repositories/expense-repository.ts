import { Expense } from '../modules/expense/entity/expense'

export interface ExpenseRepository {
  add(expense: Expense): Promise<Expense | null>
  findMany(payerId: string): Promise<Expense[]>
  findById(id: string): Promise<Expense | null>
  deleteOne(id: string): Promise<void>
  save(data: Expense): Promise<Expense>
}
