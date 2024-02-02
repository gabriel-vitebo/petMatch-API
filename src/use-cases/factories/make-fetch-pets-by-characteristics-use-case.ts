import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

export function makeFetchPetsByCharacteristicsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetByCharacteristicsUseCase(prismaPetsRepository)

  return useCase
}
