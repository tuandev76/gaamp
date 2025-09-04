import { NextResponse } from 'next/server'

import { getTransactionHistory } from '@/modules/transactions/service.server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') ?? '50')
  const cursor = searchParams.get('cursor') ?? undefined

  const data = await getTransactionHistory({ limit, cursor })

  return NextResponse.json(data, { status: 200 })
}
