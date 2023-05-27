import { RegisterUser } from '@/src/application/modules/user/use-cases/protocols'
import { Request, Response } from 'express'

export class RegisterController {
  constructor(private readonly registerUserUseCase: RegisterUser) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, username } = req.body

    const response = await this.registerUserUseCase.execute({
      name,
      password,
      username,
    })

    return res.status(201).json({
      user: response.user,
    })
  }
}
