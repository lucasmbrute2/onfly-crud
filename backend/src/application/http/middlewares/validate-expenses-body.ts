import { AppError } from '@/src/shared/errors/global-errors'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const createBodySchema = z.object({
  description: z.string().refine((description) => description.length < 191, {
    message: 'Description should not be greater than 191 characters',
  }),
  cost: z.number().refine((cost) => cost > 0, {
    message: 'Mininum cost is 1.',
  }),
  payerId: z.string(),
})

const validationByRoutePaths = {
  '/': createBodySchema,
}

type Paths = keyof typeof validationByRoutePaths

export function validateExpenseBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = validationByRoutePaths[req.path as Paths].safeParse(
    req.body,
  )

  if (validation.success === false) {
    throw new AppError(
      `${validation.error.issues.map((error) => {
        if (error.code === 'invalid_type') {
          return `Field '${error.path}' is required`
        }

        return error.message
      })}`,
      400,
    )
  }

  return next()
}
