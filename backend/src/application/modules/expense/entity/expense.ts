import { randomUUID } from 'crypto'
import { InvalidCredentialsError } from '../../user/errors/invalid-credentials-error'
import { InvalidCostError } from '../../user/errors/invalid-cost-error'
import { AppError } from '@/src/shared/errors/global-errors'

export interface ExpenseProps {
  id?: string
  description: string
  createdAt?: Date
  cost: number
  payerId: string
}

export class Expense {
  private readonly MAX_CHAR_LENGTH = 191
  private readonly MIN_COST = 1

  constructor(private props: ExpenseProps) {
    this.props = {
      ...props,
      id: this.props.id ?? randomUUID(),
      createdAt: this.props.createdAt ?? new Date(),
    }
    this.validateDescriptionSize()
    this.validateCostValue()
    this.preventFutureDates()
  }

  private validateDescriptionSize() {
    if (this.props.description.length > this.MAX_CHAR_LENGTH) {
      throw new InvalidCredentialsError(
        `Description should not be greater than ${this.MAX_CHAR_LENGTH} characters`,
      )
    }
  }

  private validateCostValue() {
    if (this.props.cost < this.MIN_COST) {
      throw new InvalidCostError(
        `You should pay something, min cost is ${this.MIN_COST}.`,
      )
    }
  }

  private preventFutureDates() {
    if (this.props.createdAt.getTime() > new Date().getTime()) {
      throw new AppError('Invalid date', 400)
    }
  }

  set id(id: string) {
    this.props.id = id
  }

  get id(): string {
    return this.props.id
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.validateDescriptionSize()
    this.props.description = description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.preventFutureDates()
    this.props.createdAt = createdAt
  }

  get cost(): number {
    return this.props.cost
  }

  set cost(cost: number) {
    this.validateCostValue()
    this.props.cost = cost
  }

  get payerId(): string {
    return this.props.payerId
  }

  set payerId(payerId: string) {
    this.props.payerId = payerId
  }
}
