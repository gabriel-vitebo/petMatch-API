import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['CUB', 'ADULT', 'ELDERLY']),
    size: z.enum(['LOW', 'MIDDLE', 'HIGH']),
    energyLevel: z.enum(['LOW', 'MIDDLE', 'HIGH']),
    levelOfIndependence: z.enum(['LOW', 'MIDDLE', 'HIGH']),
    environment: z.string(),
    requirements: z.string().array(),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    levelOfIndependence,
    environment,
    requirements,
  } = registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  const data = await registerPetUseCase.execute({
    orgId: request.user.sub,
    name,
    about,
    age,
    size,
    energyLevel,
    levelOfIndependence,
    environment,
    requirements,
  })

  return reply.status(201).send({ petId: data.pet.id })
}
