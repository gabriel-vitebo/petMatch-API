import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgPhoneNumberUseCase } from '../get-org-phone-number'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgPhoneNumberUseCase

describe('Get Org Phone Number Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgPhoneNumberUseCase(petsRepository, orgsRepository)
  })

  it('should be able to get org phone number', async () => {
    const org = await orgsRepository.create({
      person_responsible: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
      cep: '123456789',
      phoneNumber: '123456789',
    })

    await petsRepository.create({
      id: 'pet_id_01',
      org_id: org.id,
      name: 'pet JohnDoe',
      age: 'ADULT',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'MIDDLE',
      about: 'é um pet bonitinho',
      environment: 'aberto',
      requirements: ['requisito um', 'requisito dois', 'requisito três'],
    })

    const { phoneNumber } = await sut.execute({
      petId: 'pet_id_01',
    })

    await expect(phoneNumber).toEqual('123456789')
  })

  it('should not be able to get phone number with wrong Pet id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
