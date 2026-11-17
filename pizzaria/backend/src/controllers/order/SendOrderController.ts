import { Request, Response } from "express"
import { SendOrderService } from '../../services/order/SendOrderService'

class SendOrderController {
  async handleSendOrder(req: Request, res: Response) {
    const { name, order_id } = req.body
    const sendOrderService = new SendOrderService()
    const order = await sendOrderService.execute({ name, order_id })

    res.json(order)
  }
}

export { SendOrderController }
