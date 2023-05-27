import { Router } from 'express'
import { userRouter } from './user.routes'
const route = Router()

route.use('/users', userRouter)

export { route }
