import { Request, Response } from "express"
import { removeItemOrderQuerySchema } from "../../schema/OrderSchema"
import { DeleteItemOrderService } from "../../services/order/DeleteItemOrderService"

class DeleteItemOrderController {
  async handleDeleteItemOrder(req: Request, res: Response) {
    const { item_id } = removeItemOrderQuerySchema.parse(req.query)
    const deleteItemOrderService = new DeleteItemOrderService()
    const item = await deleteItemOrderService.execute({ item_id })

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado!" })
    }

    return res.json(item)
  }
}

export { DeleteItemOrderController }
