import { RegisterUseCase } from '@/src/application/modules/user/use-cases/register-use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UserView } from '../../views/user-view'
import { User } from '@/src/application/modules/user/entity/user'

export class RegisterController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, username } = req.body
    const registerUserUseCase = container.resolve(RegisterUseCase)

    const { user } = await registerUserUseCase.execute({
      name,
      password,
      username,
    })

    return res.status(201).json({
      user: UserView.toHttp(user as User),
    })
  }
}
