import { prisma } from '@/lib/prisma'
import { gettingUserCep } from '@/utils/gettingUserCep'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.number(),
  })

  const userFullAddressSchema = z.object({
    city: z.string(),
    neighborhood: z.string(),
  })

  const { name, email, password, cep } = registerBodySchema.parse(request.body)

  const userFullAddress = await gettingUserCep(cep)

  const { city, neighborhood } = userFullAddressSchema.parse(userFullAddress)

  console.log({ city, neighborhood })

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
      cep,
      city,
      address: neighborhood,
    },
  })

  return reply.status(201).send()
}
