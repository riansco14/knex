import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	DATABASE_URL: z.string(),
	PORT: z.number().default(3000),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('Invalid env variables', _env.error.format())
	throw new Error('Invalid env variables')
}

export const env = _env.data
