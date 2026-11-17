import { Request, Response } from "express"
import { CreateProductService } from "../../services/product/CreateProductService"

class CreateProductController {
  async handleProduct(req: Request, res: Response,) {
    const {
      name,
      price,
      description,
      category_id,
    } = req.body

    if (!req.file) {
      throw new Error('A imagem do produto é obrigatoria!')
    }

    const createProductService = new CreateProductService()
    const product = await createProductService.execute({
      name,
      price,
      description,
      category_id,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
    })

    res.json(product)
  }
}

export { CreateProductController }