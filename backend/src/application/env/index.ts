import { AppError } from '@/src/shared/errors/global-errors'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.string().default('3333'),
  SECRET_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new AppError(_env.error.stack, 500)
}

export const env = _env.data
