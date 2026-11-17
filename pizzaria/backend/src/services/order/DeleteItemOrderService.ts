import prismaClient from "../../prisma"

interface DeleteItemOrderProps {
  item_id: string
}

class DeleteItemOrderService {
  async execute({ item_id }: DeleteItemOrderProps) {
    const itemExists = await prismaClient.item.findUnique({
      where: {
        id: item_id,
      },
    })

    if (!itemExists) {
      return null
    }

    return prismaClient.item.delete({
      where: {
        id: item_id,
      },
      select: {
        id: true,
        amount: true,
        order_id: true,
        product_id: true,
      },
    })
  }
}

export { DeleteItemOrderService }
