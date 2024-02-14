import { FastifyRequest, FastifyReply } from 'fastify'

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  return reply.status(200).send()
}
