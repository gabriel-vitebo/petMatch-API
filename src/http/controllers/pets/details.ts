import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { makeGetOrgPhoneNumberUseCase } from '@/use-cases/factories/make-get-org-phone-number-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = detailsPetsParamsSchema.parse(request.params)

  const detailsPetUseCase = makeGetPetDetailsUseCase()
  const phoneNumberUseCase = makeGetOrgPhoneNumberUseCase()

  const { pet } = await detailsPetUseCase.execute({
    petId,
  })

  const { phoneNumber } = await phoneNumberUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    data: {
      pet,
    },
    contact: {
      phoneNumber,
    },
  })
}
