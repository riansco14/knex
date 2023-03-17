import type { Knex } from 'knex'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite',
		connection: {
			filename: './app.db',
		},
		useNullAsDefault: true,
		migrations: {
			extension: 'ts',
			directory: 'migrations',
		},
	},
}

module.exports = config
