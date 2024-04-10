import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { MandatoryFieldError } from './erros/mandatory-filed-error'

interface FetchPetByCityUseCaseRequest {
  citySearched: string
  page: number
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
    citySearched,
    page,
  }: FetchPetByCityUseCaseRequest): Promise<FetchPetByCityUseCaseResponse> {
    if (!citySearched) {
      throw new MandatoryFieldError()
    }

    const citiesThatMatched = await this.orgsRepository.findByCity(citySearched)

    const pets = await this.petsRepository.findManyByCityOfTheOrg(
      citiesThatMatched,
      page,
    )

    return {
      pets,
    }
  }
}
