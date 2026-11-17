import { Request, Response } from "express"
import { ListOrdersService } from "../../services/order/ListOrdersService"

class ListOrdersController {
  async handleListOrders(req: Request, res: Response) {
    const draft  = req.query?.draft as string | undefined
    const listOrdersService = new ListOrdersService()
    const orders = await listOrdersService.execute({ draft })

    res.json(orders)
  }
}

export { ListOrdersController }
