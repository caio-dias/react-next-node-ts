import prismaClient from "../../prisma"

interface DeleteOrderProps {
  order_id: string
}

class DeleteOrderService {
  async execute({ order_id }: DeleteOrderProps ) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        }
      })

      if (!orderExists) {
        throw new Error('Pedido não encontrado!')
      }

      const finishOrder = await prismaClient.order.delete({
        where: {
          id: order_id,
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
      throw new Error('Não foi possivel deletar o pedido!')
    }
  }
}

export { DeleteOrderService }