// src/modules/transactions/dto.ts
import { z } from 'zod'

export const TransactionSchema = z.object({
  id: z.string(),
  type: z.enum(['CREDIT', 'DEBIT']),
  amount: z.number(),
  currency: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string()
})

export const HistoryQuerySchema = z.object({
  limit: z.number().int().min(1).max(200).default(50),
  cursor: z.string().optional(),
  accountId: z.string().optional() // nếu có lọc theo tài khoản con
})

// ---- Chuẩn hóa nhiều dạng payload về { items, nextCursor } ----
const HistoryRawSchema = z.union([
  z.object({ items: z.array(TransactionSchema), nextCursor: z.string().nullable().optional() }),
  z
    .object({ data: z.array(TransactionSchema), nextCursor: z.string().nullable().optional() })
    .transform(({ data, nextCursor }) => ({ items: data, nextCursor })),
  z
    .object({ result: z.array(TransactionSchema), nextCursor: z.string().nullable().optional() })
    .transform(({ result, nextCursor }) => ({ items: result, nextCursor })),
  z.array(TransactionSchema).transform(arr => ({ items: arr, nextCursor: null })),
  z.object({}).transform(() => ({ items: [], nextCursor: null }))
])

export const HistoryResponseSchema = HistoryRawSchema

// ====== Types ======
export type HistoryQuery = z.infer<typeof HistoryQuerySchema>
export type HistoryResponse = z.infer<typeof HistoryResponseSchema>
export type Transaction = z.infer<typeof TransactionSchema>
