export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class Unauthorized extends AppError {
  constructor(message: string) {
    super(message, 401)
  }
}

export class Forbidden extends AppError {
  constructor(message: string) {
    super(message, 403)
  }
}
