import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './erros/org-already-exist-error'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  personResponsible: string
  orgName?: string
  email: string
  password: string
  cep: string
  city?: string
  address?: string
  phoneNumber: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    personResponsible,
    orgName,
    email,
    password,
    cep,
    city,
    address,
    phoneNumber,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const orgAddress = await this.getAddress(cep, city, address)

    if (!orgAddress) {
      throw new Error('invalid address')
    }

    const org = await this.orgsRepository.create({
      person_responsible: personResponsible,
      org_name: orgName,
      email,
      password_hash,
      cep,
      city: orgAddress?.city,
      address: orgAddress?.neighborhood,
      phoneNumber,
    })

    return { org }
  }

  private async getAddress(cep: string, city?: string, address?: string) {
    const correctedCep = cep.replace(/\D/g, '')

    if (!city || !address) {
      return await this.orgsRepository.gettingCep(correctedCep)
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
