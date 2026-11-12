import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { validateSchema } from './middlewares/ValidateSchema'
import { createUserSchema } from './schema/UserSchema'

const router = Router()

router.post('/users', validateSchema(createUserSchema), new CreateUserController().handleUser)

export { router }