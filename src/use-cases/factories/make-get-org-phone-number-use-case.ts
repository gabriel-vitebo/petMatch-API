import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetOrgPhoneNumberUseCase } from '../get-org-phone-number'

export function makeGetOrgPhoneNumberUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgPhoneNumberUseCase(prismaPetsRepository, prismaOrgsRepository)

  return useCase
}
