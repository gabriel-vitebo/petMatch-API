import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetOrgPhoneNumberUseCaseRequest {
  petId: string
}

interface GetOrgPhoneNumberUseCaseResponse {
  phoneNumber: string
}

export class GetOrgPhoneNumberUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) { }

  async execute({
    petId,
  }: GetOrgPhoneNumberUseCaseRequest): Promise<GetOrgPhoneNumberUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet?.org_id) {
      throw new ResourceNotFoundError()
    }
    const org = await this.orgsRepository.findById(pet?.org_id)

    if (!org?.phoneNumber) {
      throw new ResourceNotFoundError()
    }

    const phoneNumber = org.phoneNumber

    return { phoneNumber }
  }
}
