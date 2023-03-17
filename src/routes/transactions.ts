import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/teste', async () => {
		const transaction = await knex('transactions')
			.where('amount', 2000)
			.select('*')

		return transaction
	})
}
