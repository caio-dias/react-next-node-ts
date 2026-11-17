import prismaClient from "../../prisma"

interface DeleteProductProps {
  product_id: string
}

class DeleteProductService {
  async execute({ product_id }: DeleteProductProps) {
    try {
      const product = await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
        select: {
          name: true,
          disabled: true,
        }
      })
      return product
    } catch (error) {
      throw new Error("Falha ao deletar o produto!")
    }
  }
}

export { DeleteProductService }
