import { z } from 'zod'

export const todoSchema = z.object({
  text: z.string(),
  marcado: z.boolean().optional().default(false),
  id: z.string().optional(),
})

export type Todo = z.infer<typeof todoSchema>
