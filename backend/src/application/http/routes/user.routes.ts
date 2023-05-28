import { Router } from 'express'
import { validateUserBody } from '../middlewares/validate-user-body'
import { RegisterController } from '../controllers/users/register-controller'
import { AuthController } from '../controllers/users/auth-controller'

const userRouter = Router()
const registerController = new RegisterController()
const authController = new AuthController()

userRouter.post('/', validateUserBody, registerController.handle)
userRouter.post('/auth', validateUserBody, authController.handle)

export { userRouter }
