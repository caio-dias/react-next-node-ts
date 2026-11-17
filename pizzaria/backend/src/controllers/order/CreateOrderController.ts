import { Request, Response } from "express"
import { CreateOrderService } from "../../services/order/CreateOrderService"

class CreateOrderController {
  async handleCreateOrder(req: Request, res: Response) {
    const { table, name } = req.body
    const createOrderService = new CreateOrderService()
    const order = await createOrderService.execute({ table, name })

    res.json(order)
  }
}

export { CreateOrderController }
