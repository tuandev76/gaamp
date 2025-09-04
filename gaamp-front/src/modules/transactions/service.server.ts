import 'server-only'
import { http } from '@/libs/http'
import { ApiError } from '@/libs/errors'
import { HistoryResponseSchema, type HistoryResponse, HistoryQuerySchema, type HistoryQuery } from './dto'

const BASE_PATH = '/api/v1/transactions'

export async function getTransactionHistory(input?: Partial<HistoryQuery>): Promise<HistoryResponse> {
  const params = HistoryQuerySchema.parse(input ?? {})

  const raw = await http<unknown>({
    path: `${BASE_PATH}/history`,
    method: 'GET',
    query: {
      limit: params.limit,
      cursor: params.cursor,
      accountId: params.accountId
    },
    retries: 1
  })

  const parsed = HistoryResponseSchema.safeParse(raw)

  if (!parsed.success) {
    // Ghi log giúp bạn thấy backend trả gì
    console.error('History API unexpected payload:', raw, parsed.error.flatten())
    throw new ApiError('Bad payload from history endpoint', 502, 'BAD_PAYLOAD', parsed.error.flatten())
  }

  return parsed.data
}
