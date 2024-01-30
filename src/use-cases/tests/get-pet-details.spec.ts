import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get user profile', async () => {
    const createdPet = await petsRepository.create({
      id: 'pet_id_01',
      org_id: 'org_id_01',
      name: 'pet JohnDoe',
      age: 'ADULT',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'MIDDLE',
      about: 'é um pet bonitinho',
      environment: 'aberto',
      requirements: ['requisito um', 'requisito dois', 'requisito três'],
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    await expect(pet.id).toEqual(expect.any(String))
    await expect(pet.name).toEqual('pet JohnDoe')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
