import { Request, Response } from "express"
import { DeleteProductService } from "../../services/product/DeleteProductService"

class DeleteProductController {
  async handleDeleteProduct(req: Request, res: Response) {
    const product_id = req.query?.product_id as string
    console.log(product_id)
    const deleteProductService = new DeleteProductService()
    const product = await deleteProductService.execute({ product_id })

    res.json(product)
  }
}

export { DeleteProductController }
