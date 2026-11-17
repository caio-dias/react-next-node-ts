import { Request, Response } from "express"
import { ListProductsService } from "../../services/product/ListProductsService"

class ListProductsController {
  async handleListProducts(req: Request, res: Response) {
    const disabledParam = req.query.disabled
    const rawDisabled = Array.isArray(disabledParam)
      ? disabledParam[0]
      : disabledParam

    const disabled =
      rawDisabled === undefined
        ? false
        : typeof rawDisabled === "string"
          ? rawDisabled.toLowerCase() === "true"
          : false

    const listProductsService = new ListProductsService()
    const products = await listProductsService.execute(disabled)

    res.json(products)
  }
}

export { ListProductsController }
