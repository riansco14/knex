import { knex as setupKnex } from 'knex'
import { env } from './env'

export const knex = setupKnex({
	client: 'sqlite',
	connection: {
		filename: env.DATABASE_URL,
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: 'migrations',
	},
})
