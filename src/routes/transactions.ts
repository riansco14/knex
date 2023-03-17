import { FastifyInstance } from 'fastify'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/checkSessionId'

export async function transactionsRoutes(app: FastifyInstance) {
	app.get(
		'/',
		{ preHandler: [checkSessionIdExists] },
		async (request, response) => {
			const sessionId = request.cookies.sessionId as string

			const transactions = await knex('transactions')
				.where('session_id', sessionId)
				.select()
			return { transactions }
		},
	)

	app.get(
		'/summary',
		{ preHandler: [checkSessionIdExists] },
		async (request) => {
			const sessionId = request.cookies.sessionId as string

			const summary = await knex('transactions')
				.where('session_id', sessionId)
				.sum('amount', { as: 'amount' })
				.first()
			return { summary }
		},
	)

	app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
		const sessionId = request.cookies.sessionId as string

		const getTransactionParamsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = getTransactionParamsSchema.parse(request.params)

		const transaction = await knex('transactions')
			.where({
				id,
				session_id: sessionId,
			})
			.first()

		return { transaction }
	})

	app.post('/', async (request, response) => {
		// const {  } = request.body
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body,
		)

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()
			response.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			})
		}

		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		})

		return response.status(201).send()
	})
}
