import { Router } from 'express'
import { validateUserBody } from '../middlewares/validate-user-body'
import { RegisterController } from '../controllers/users/register-controller'

const userRouter = Router()
const registerController = new RegisterController()

userRouter.post('/', validateUserBody, registerController.handle)

export { userRouter }
