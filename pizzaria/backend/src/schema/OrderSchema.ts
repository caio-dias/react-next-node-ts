import { z } from "zod"

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O número da mesa precisa ser um número!" })
      .int({ message: "O número da mesa precisa ser um inteiro!" })
      .positive({ message: "O número da mesa precisa ser maior que zero!" }),
    name: z
      .string({ message: "O nome do cliente precisa ser um texto!" })
      .trim()
      .min(1, { message: "O nome do cliente é obrigatório!" }),
  }),
})

export const addItemOrderSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: "O id do pedido precisa ser um texto!" })
      .trim()
      .min(1, { message: "O id do pedido é obrigatório!" }),
    product_id: z
      .string({ message: "O id do produto precisa ser um texto!" })
      .trim()
      .min(1, { message: "O id do produto é obrigatório!" }),
    amount: z
      .number().int({ message: "A quantidade do produto precisa ser um numero inteiro!" })
        .positive({ message: "A quantidade do produto precisa ser um numero positivo!" })
      .min(1, { message: "A quantidade do produto é obrigatória!" }),
  }),
})

export const removeItemOrderQuerySchema = z.object({
  item_id: z
    .string({ message: "O id do item precisa ser um texto!" })
    .trim()
    .min(1, { message: "O id do item é obrigatório!" }),
})

export const removeItemOrderSchema = z.object({
  query: removeItemOrderQuerySchema,
})

export const orderDetailQuerySchema = z.object({
  order_id: z
    .string({ message: "O id do pedido precisa ser um texto!" })
    .trim()
    .min(1, { message: "O id do pedido é obrigatório!" }),
})

export const orderDetailSchema = z.object({
  query: orderDetailQuerySchema,
})


export const sendOrderSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: "O id do pedido precisa ser um texto!" })
      .min(1, { message: "O id do pedido é obrigatório!" }),
  })
})

export const deleteOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: "O id do pedido precisa ser um texto!" })
      .min(1, { message: "O id do pedido é obrigatório!" }),
  })
})