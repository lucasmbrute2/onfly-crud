import { AppError } from '@/src/shared/errors/global-errors'

export class InvalidCostError extends AppError {
  constructor(message?: string) {
    super(message, 400)
  }
}
