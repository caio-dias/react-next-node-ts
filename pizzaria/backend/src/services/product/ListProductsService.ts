import prismaClient from "../../prisma"

class ListProductsService {
  async execute(disabled: boolean) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disabled,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return products
    } catch (error) {
      throw new Error("Falha ao buscar os produtos!")
    }
  }
}

export { ListProductsService }
