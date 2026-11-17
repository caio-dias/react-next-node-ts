import { Request, Response } from "express"
import { orderDetailQuerySchema } from "../../schema/OrderSchema"
import { OrderDetailService } from "../../services/order/OrderDetailService"

class OrderDetailController {
  async handleOrderDetail(req: Request, res: Response) {
    const { order_id } = orderDetailQuerySchema.parse(req.query)
    const orderDetailService = new OrderDetailService()
    const order = await orderDetailService.execute({ order_id })

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado!" })
    }

    return res.json(order)
  }
}

export { OrderDetailController }
