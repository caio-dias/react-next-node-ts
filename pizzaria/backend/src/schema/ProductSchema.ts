import { z } from "zod"

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "O nome do produto é obrigatório" }),
    price: z.string().min(1, { message: "O valor do produto é obrigatório" }),
    description: z
      .string()
      .min(1, { message: "A descrição do produto é obrigatória" }),
    category_id: z.string({ message: "A Categoria do produto é obrigatória" }),
  }),
});

export const listCategoryProductsQuerySchema = z.object({
  category_id: z.string().min(1, { message: "A categoria é obrigatória" }),
})

export const listCategoryProductsSchema = z.object({
  query: listCategoryProductsQuerySchema,
})
