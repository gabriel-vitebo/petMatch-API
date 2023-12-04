import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.number(),
  })

  const { name, email, password, cep } = registerBodySchema.parse(request.body)

  const userCep = `GET https://brasilapi.com.br/api/cep/v2/${cep}`

  console.log(userCep)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
      cep: userCep,
    },
  })

  return reply.status(201).send()
}
