import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/teste', async () => {
	const test = await knex('sqlite_schema').select('*')
	console.log(test)

	return test
})

app
	.listen({
		port: 3000,
	})
	.then(() => {
		console.log('Server started')
	})
