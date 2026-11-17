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
import { ListCategoryProductsController } from './controllers/product/ListCategoryProductsController'
import { DeleteProductController } from './controllers/product/DeleteProductsController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { AddItemOrderController } from './controllers/order/AddItemOrderController'
import { DeleteItemOrderController } from './controllers/order/DeleteItemOrderController'
import { OrderDetailController } from './controllers/order/OrderDetailController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'
import { DeleteOrderController } from './controllers/order/DeleteOrderController'

// middlewares
import { validateSchema } from './middlewares/ValidateSchema'
import { checkAuthenticate } from './middlewares/CheckAuthenticate'
import { isAdmin } from './middlewares/isAdmin'

// schemas
import { createUserSchema, authUserSchema } from './schema/UserSchema'
import { createCategorySchema } from './schema/CategorySchema'
import { createProductSchema, listCategoryProductsSchema } from './schema/ProductSchema'
import {
  createOrderSchema,
  addItemOrderSchema,
  removeItemOrderSchema,
  orderDetailSchema,
  sendOrderSchema,
  deleteOrderSchema,
} from './schema/OrderSchema'

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

router.get('/category/product',
  checkAuthenticate,
  validateSchema(listCategoryProductsSchema),
  new ListCategoryProductsController().handleListCategoryProducts,
)

router.post('/product',
  checkAuthenticate,
  isAdmin,
  upload.single('file'),
  validateSchema(createProductSchema),
  new CreateProductController().handleProduct
)

router.delete('/product', checkAuthenticate, isAdmin, new DeleteProductController().handleDeleteProduct)

// pedido
router.post('/order',
  checkAuthenticate,
  validateSchema(createOrderSchema),
  new CreateOrderController().handleCreateOrder,
)

router.get('/orders',
  checkAuthenticate,
  new ListOrdersController().handleListOrders,
)

router.get('/order/detail',
  checkAuthenticate,
  validateSchema(orderDetailSchema),
  new OrderDetailController().handleOrderDetail,
)

// adicionar item ao pedido
router.post('/order/add',
  checkAuthenticate,
  validateSchema(addItemOrderSchema),
  new AddItemOrderController().handleAddItemOrder,
)

// remover item do pedido
router.delete('/order/remove',
  checkAuthenticate,
  validateSchema(removeItemOrderSchema),
  new DeleteItemOrderController().handleDeleteItemOrder,
)

// envia pedido para produção
router.put('/order/send',
  checkAuthenticate,
  validateSchema(sendOrderSchema),
  new SendOrderController().handleSendOrder,
)

// finaliza pedido
router.put('/order/finish',
  checkAuthenticate,
  validateSchema(sendOrderSchema),
  new FinishOrderController().handleFinishOrder,
)

// deleta pedido
router.delete('/order/delete',
  checkAuthenticate,
  validateSchema(deleteOrderSchema),
  new DeleteOrderController().handleDeleteOrder,
)

export { router }
