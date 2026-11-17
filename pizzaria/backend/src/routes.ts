import { Router } from 'express'

// multer
import multer from 'multer'
import uploadConfig from '../src/config/multer'

// controllers
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoriesController } from './controllers/category/ListCategoriesController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListProductsController } from './controllers/product/ListProductsController'
import { DeleteProductController } from './controllers/product/DeleteProductsController'

// middlewares
import { validateSchema } from './middlewares/ValidateSchema'
import { checkAuthenticate } from './middlewares/CheckAuthenticate'
import { isAdmin } from './middlewares/isAdmin'

// schemas
import { createUserSchema, authUserSchema } from './schema/UserSchema'
import { createCategorySchema } from './schema/CategorySchema'
import { createProductSchema } from './schema/ProductSchema'

const router = Router()
const upload = multer(uploadConfig)

// usuario
router.post('/users', validateSchema(createUserSchema), new CreateUserController().handleUser)

// login
router.post('/session', validateSchema(authUserSchema), new AuthUserController().handleAuthUser)

// detalhes do usuario
router.get('/me', checkAuthenticate, new DetailUserController().handleDetailUser)

// categoria
router.get('/category', checkAuthenticate, new ListCategoriesController().handleListCategories)

router.post('/category', 
  validateSchema(createCategorySchema),
  checkAuthenticate, isAdmin,
  new CreateCategoryController().handleCategory,
)

// produto
router.get('/products', checkAuthenticate, new ListProductsController().handleListProducts)

router.post('/product',
  checkAuthenticate,
  isAdmin,
  upload.single('file'),
  validateSchema(createProductSchema),
  new CreateProductController().handleProduct
)

router.delete('/product', checkAuthenticate, isAdmin, new DeleteProductController().handleDeleteProduct)

export { router }