import { AppError } from '@/src/shared/errors/global-errors'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../../env'

export class Authorization {
  async ensureAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    try {
      // eslint-disable-next-line
      const [_, token] = authHeader.split(' ')
      const { sub: payerId } = verify(token, env.SECRET_KEY)

      req.payerId = payerId as string
      return next()
    } catch (error) {
      throw new AppError('Missing token', 403)
    }
  }
}
