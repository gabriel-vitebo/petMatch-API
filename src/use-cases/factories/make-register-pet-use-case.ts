import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetsUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetsUseCase(prismaPetsRepository)

  return useCase
}
