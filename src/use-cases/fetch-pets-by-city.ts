import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'



interface FetchPetByCityUseCaseRequest {
  citySearched: string
}

interface FetchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) { }

  async execute({
    citySearched
  }: FetchPetByCityUseCaseRequest): Promise<FetchPetByCityUseCaseResponse> {
    const citiesThatMatched = await this.orgsRepository.findByCity(citySearched)

    const pets = await this.petsRepository.findManyByCityOfTheOrg(citiesThatMatched)

    return {
      pets
    }


  }
}
