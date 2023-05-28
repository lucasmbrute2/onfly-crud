import { AuthUserUseCase } from '@/src/application/modules/user/use-cases/auth-use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class AuthController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const authUserUseCase = container.resolve(AuthUserUseCase)
    const response = await authUserUseCase.execute({
      password,
      username,
    })

    return res.status(200).json({
      user: response.user,
      token: response.accessToken,
    })
  }
}
