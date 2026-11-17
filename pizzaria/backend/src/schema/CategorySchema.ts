import { z } from "zod"

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'A categoria precisa ser um texto!' })
      .min(3, { message: "A categoria precisa ter no minimo 3 caracteres!" }),
  })
})