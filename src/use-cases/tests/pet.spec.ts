import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetsUseCase } from '../pet'

let petsRepository: InMemoryPetsRepository
let sut: PetsUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new PetsUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      orgId: 'org-01',
      name: 'pet JohnDoe',
      age: 'filhote',
      energyLevel: 'MIDDLE',
      levelOfIndependence: 'MIDDLE',
      size: 'MIDDLE',
      about: 'é um pet bonitinho',
      environment: 'aberto',
      requirements: ['requisito um', 'requisito dois', 'requisito 3'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
