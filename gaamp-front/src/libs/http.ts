import 'server-only' // prevent accidental client bundling
import { ENV } from '@/libs/env'
import { ApiError } from '@/libs/errors'
import { getAccessToken } from '@/libs/auth'

export type HttpOptions = {
  path: string // e.g. "/api/v1/transactions/history"
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  query?: Record<string, string | number | boolean | undefined>
  body?: unknown
  headers?: Record<string, string>
  timeoutMs?: number // default 10s
  retries?: number // default 0
}

function buildUrl(path: string, query?: HttpOptions['query']) {
  const base = ENV.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, '')
  const url = new URL(path.startsWith('/') ? base + path : `${base}/${path}`)

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v))
    })
  }

  return url.toString()
}

async function fetchWithTimeout(resource: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(resource, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

export async function http<T = unknown>(opts: HttpOptions): Promise<T> {
  const { path, method = 'GET', query, body, headers = {}, timeoutMs = 10_000, retries = 0 } = opts

  const url = buildUrl(path, query)

  // Server-only: read access token from session (NextAuth)
  const token = await getAccessToken()

  const init: RequestInit = {
    method,
    headers: {
      accept: 'application/json',
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store', // safest default for mutating/secure endpoints
    credentials: 'omit'
  }

  let attempt = 0
  let lastErr: unknown

  while (attempt <= retries) {
    try {
      const res = await fetchWithTimeout(url, init, timeoutMs)
      const text = await res.text()
      const json = text ? JSON.parse(text) : undefined

      if (!res.ok) {
        throw new ApiError(json?.message || res.statusText, res.status, json?.code, json)
      }

      return json as T
    } catch (e) {
      lastErr = e

      // Retry on network errors or 502/503/504
      const status = (e as ApiError).status ?? 0
      const transient = status === 0 || [502, 503, 504].includes(status)

      if (!transient || attempt === retries) break
      attempt++
      await new Promise(r => setTimeout(r, 300 * attempt))
    }
  }

  if (lastErr instanceof ApiError) throw lastErr
  throw new ApiError('Network error', 0)
}
