export class ApiError extends Error {
  status: number
  code?: string
  details?: unknown

  constructor(message: string, status = 500, code?: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError
}
