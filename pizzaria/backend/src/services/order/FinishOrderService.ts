import prismaClient from "../../prisma"

interface FinishOrderProps {
  order_id: string
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderProps ) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        }
      })

      if (!orderExists) {
        throw new Error('Pedido não encontrado!')
      }

      const finishOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          name: true,
          draft: true,
          status: true,
          items: true,
          table: true,
          createdAt: true,
        },
      })
      return finishOrder
    } catch (error) {
      throw new Error('Não foi possivel finalizar o pedido!')
    }
  }
}

export { FinishOrderService }