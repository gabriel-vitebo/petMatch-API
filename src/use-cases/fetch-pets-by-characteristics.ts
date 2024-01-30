import { Age, Characteristics, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetByCharacteristicsUseCaseRequest {
  age: Age | null,
  energy_level: Characteristics | null,
  level_of_independence: Characteristics | null,
  size: Characteristics | null,
}

interface FetchPetByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByCharacteristicsUseCase {
  constructor(
    private petsRepository: PetsRepository,
  ) { }

  async execute({
    age,
    energy_level,
    level_of_independence,
    size
  }: FetchPetByCharacteristicsUseCaseRequest): Promise<FetchPetByCharacteristicsUseCaseResponse> {

    const pets = await this.petsRepository.findManyByCharacteristics(
      age,
      energy_level,
      level_of_independence,
      size
    )

    return {
      pets
    }


  }
}
