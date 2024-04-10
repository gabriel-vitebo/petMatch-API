import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/erros/org-already-exist-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    personResponsible: z.string(),
    orgName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    city: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string(),
  })

  const {
    personResponsible,
    orgName,
    email,
    password,
    cep,
    city,
    address,
    phoneNumber,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      personResponsible,
      orgName,
      email,
      password,
      cep,
      city,
      address,
      phoneNumber,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
