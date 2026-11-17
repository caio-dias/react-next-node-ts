import { Request, Response } from "express"
import { listCategoryProductsQuerySchema } from "../../schema/ProductSchema"
import { ListCategoryProductsService } from "../../services/product/ListCategoryProductsService"

class ListCategoryProductsController {
  async handleListCategoryProducts(req: Request, res: Response) {
    const { category_id } = listCategoryProductsQuerySchema.parse(req.query)
    const listCategoryProductsService = new ListCategoryProductsService()
    const products = await listCategoryProductsService.execute(category_id)

    res.json(products)
  }
}

export { ListCategoryProductsController }
