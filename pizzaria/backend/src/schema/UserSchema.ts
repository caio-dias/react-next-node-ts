import { z } from "zod"

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({message: 'o nome precisa ser um texto'})
      .min(3, {message: 'o nome precisa ter no minimo 3 caracteres'}),
    email: z
      .email({message: 'o email precisa ser valido'}),
    password: z
      .string()
      .min(6, {message: 'o nome precisa ter no minimo 6 caracteres'}),
  })
})