import prismaClient from "../../prisma"

interface SendOrderProps {
  name?: string
  order_id: string
}

class SendOrderService {
  async execute({ name, order_id }: SendOrderProps ) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        }
      })

      if (!orderExists) {
        throw new Error('Pedido não encontrado!')
      }

      const updateOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name
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
      return updateOrder
    } catch (error) {
      throw new Error('Não foi possivel enviar o pedido para produção!')
    }
  }
}

export { SendOrderService }