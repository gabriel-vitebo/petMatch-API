import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-by-characteristics-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetByCharacteristicsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    age: z.enum(['CUB', 'ADULT', 'ELDERLY']).nullable(),
    energy_level: z.enum(['LOW', 'MIDDLE', 'HIGH']).nullable(),
    level_of_independence: z.enum(['LOW', 'MIDDLE', 'HIGH']).nullable(),
    size: z.enum(['LOW', 'MIDDLE', 'HIGH']).nullable(),
  })

  const { page, age, energy_level, level_of_independence, size } =
    fetchPetByCharacteristicsQuerySchema.parse(request.query)

  const fetchPetByCharacteristicsUseCase =
    makeFetchPetsByCharacteristicsUseCase()

  const { pets } = await fetchPetByCharacteristicsUseCase.execute({
    page,
    age,
    energy_level,
    level_of_independence,
    size,
  })

  return reply.status(200).send({ pets })
}
