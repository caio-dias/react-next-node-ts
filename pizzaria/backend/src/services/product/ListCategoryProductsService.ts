import prismaClient from "../../prisma"

class ListCategoryProductsService {
  async execute(category_id: string) {
    const products = await prismaClient.product.findMany({
      where: {
        category_id,
        disabled: false,
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
  }
}

export { ListCategoryProductsService }
