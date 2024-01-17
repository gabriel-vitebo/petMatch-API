import { Characteristics, Age, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface PetUseCaseRequest {
  orgId: string
  name: string
  about: string | null
  age: Age
  size: Characteristics
  energyLevel: Characteristics
  levelOfIndependence: Characteristics
  environment: string
  requirements: string[]
}

interface PetUseCaseResponse {
  pet: Pet
}

export class PetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    orgId,
    name,
    about,
    age,
    energyLevel,
    environment,
    levelOfIndependence,
    requirements,
    size,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level: energyLevel,
      environment,
      level_of_independence: levelOfIndependence,
      requirements,
      size,
      org_id: orgId,
    })

    return { pet }
  }
}
