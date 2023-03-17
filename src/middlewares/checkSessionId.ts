import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
	request: FastifyRequest,
	response: FastifyReply,
) {
	const sessionId = request.cookies.sessionId as string
	if (!sessionId) {
		return response.status(401).send({
			error: 'Unauthorized',
		})
	}
}
