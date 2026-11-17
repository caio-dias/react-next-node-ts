import prismaClient from "../../prisma"

interface ListOrderProps {
  draft?: string
}

class ListOrdersService {
  async execute({ draft }: ListOrderProps) {
    try {      
      const orders = await prismaClient.order.findMany({
        where: {
          draft: draft === 'true' ? true : false
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              amount: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                }
              }
            }
          }
        },
      })
  
      return orders
    } catch (error) {
      throw new Error('Erro ao listar os pedidos!')
    }
  }
}

export { ListOrdersService }
