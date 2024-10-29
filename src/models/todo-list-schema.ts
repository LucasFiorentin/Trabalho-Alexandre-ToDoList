import { z } from 'zod'

export const todoSchema = z.object({
  text: z
    .string()
    .min(2, { message: 'O nome precisa ter pelo menos 2 caracteres' })
    .max(100, { message: 'O nome não pode exceder 100 caracteres' }),
  marcado: z.boolean().optional().default(false),
  id: z.string().optional(),
})

export type Todo = z.infer<typeof todoSchema>
