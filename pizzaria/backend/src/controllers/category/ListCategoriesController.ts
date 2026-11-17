import { Request, Response } from "express"
import { ListCategoriesService } from "../../services/category/ListCategoriesService"

class ListCategoriesController {
  async handleListCategories(_req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService()
    const categories = await listCategoriesService.execute()

    res.json(categories)
  }
}

export { ListCategoriesController }
