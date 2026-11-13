import { Router } from 'express'
// controllers
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'

// middlewares
import { validateSchema } from './middlewares/ValidateSchema'
import { checkAuthenticate } from './middlewares/CheckAuthenticate'

// schemas
import { createUserSchema, authUserSchema } from './schema/UserSchema'

const router = Router()

// usuario
router.post('/users', validateSchema(createUserSchema), new CreateUserController().handleUser)

// login
router.post('/session', validateSchema(authUserSchema), new AuthUserController().handleAuthUser)

// detalhes do usuario
router.get('/me', checkAuthenticate, new DetailUserController().handleDetailUser)

// categoria
router.post('/category', checkAuthenticate, new CreateCategoryController().handleCategory)

export { router }