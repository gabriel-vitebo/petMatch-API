import { gettingUserCep } from '@/utils/gettingUserCep'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

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

  try {
    await registerUseCase({
      name,
      email,
      password,
      cep,
      city,
      address: neighborhood,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
