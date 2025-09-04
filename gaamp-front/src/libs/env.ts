import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default('NextNest Starter'),

  // Backend base URL — never hardcode inline.
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:8080'),

  // If you mint access tokens in NextAuth callbacks.
  API_AUDIENCE: z.string().optional()
})

export const ENV = EnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_AUDIENCE: process.env.API_AUDIENCE
})
