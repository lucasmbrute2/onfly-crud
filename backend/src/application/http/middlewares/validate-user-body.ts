import { AppError } from '@/src/shared/errors/global-errors'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const registerBodySchema = z
  .object({
    name: z.string(),
    username: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      throw new AppError(`Passwords does not match`, 401)
    }
  })

const authenticateBodySchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
})

const validationByRoutePaths = {
  '/': registerBodySchema,
  '/auth': authenticateBodySchema,
}

type Paths = keyof typeof validationByRoutePaths

export function validateUserBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = validationByRoutePaths[req.path as Paths].safeParse(
    req.body,
  )

  if (validation.success === false) {
    throw new AppError(
      `Invalid body: ${JSON.stringify(validation.error.format())}`,
      400,
    )
  }

  return next()
}
