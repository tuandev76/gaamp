'use client'
import { useQuery } from '@tanstack/react-query'

async function fetchClientHistory(limit = 50) {
  const url = `/api/transactions/history?limit=${encodeURIComponent(String(limit))}`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  return (await res.json()) as { items: any[] }
}

export function useTransactionHistory(limit = 50) {
  return useQuery({
    queryKey: ['tx-history', limit],
    queryFn: () => fetchClientHistory(limit)
  })
}
