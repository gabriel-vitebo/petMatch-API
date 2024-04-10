import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetByCitQuerySchema = z.object({
    citySearched: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { citySearched, page } = fetchPetByCitQuerySchema.parse(request.query)

  const fetchPetByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetByCityUseCase.execute({
    citySearched,
    page,
  })

  return reply.status(200).send({ pets })
}
