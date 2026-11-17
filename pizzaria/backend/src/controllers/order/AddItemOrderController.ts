import { Request, Response } from "express"
import { AddItemOrderService } from "../../services/order/AddItemOrderService"

class AddItemOrderController {
  async handleAddItemOrder(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body
    const addItemOrderService = new AddItemOrderService()
    const item = await addItemOrderService.execute({ order_id, product_id, amount })

    res.json(item)
  }
}

export { AddItemOrderController }
