import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/teste', async () => {
	const transaction = await knex('transactions')
		.where('amount', 2000)
		.select('*')

	return transaction
})

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log('Server started')
	})
