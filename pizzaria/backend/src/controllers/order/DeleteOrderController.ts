import { Request, Response } from "express"
import { DeleteOrderService } from '../../services/order/DeleteOrderService'

class DeleteOrderController {
  async handleDeleteOrder(req: Request, res: Response) {
    const order_id  = req.query.order_id as string
    const deleteOrderService = new DeleteOrderService()
    const order = await deleteOrderService.execute({ order_id })

    res.json(order)
  }
}

export { DeleteOrderController }
