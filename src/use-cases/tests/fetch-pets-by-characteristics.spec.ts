import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCharacteristicsUseCase

describe('Fetch Pets By Characteristics Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCharacteristicsUseCase(petsRepository)
  })

  it('should be able to possible to list pets by characteristics', async () => {

    await petsRepository.create({
      id: 'id_01',
      org_id: 'orgOne.id',
      name: 'pet john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'LOW'
    })


    await petsRepository.create({
      id: 'id_02',
      org_id: 'orgOne.id',
      name: 'pet john doe two',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'ADULT',
      energy_level: 'LOW',
      level_of_independence: 'HIGH',
      size: 'HIGH'
    })


    await petsRepository.create({
      id: 'id_03',
      org_id: 'orgTwo.id',
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'ELDERLY',
      energy_level: 'LOW',
      level_of_independence: 'LOW',
      size: 'MIDDLE',
    })


    await petsRepository.create({
      id: 'id_04',
      org_id: 'orgThree.id',
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'ELDERLY',
      energy_level: 'LOW',
      level_of_independence: 'LOW',
      size: 'MIDDLE'
    })


    const { pets } = await sut.execute({
      page: 1,
      age: 'ELDERLY',
      energy_level: 'LOW',
      level_of_independence: 'LOW',
      size: 'MIDDLE',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be possible to list pets by filtering only by some characteristics', async () => {

    await petsRepository.create({
      id: 'id_01',
      org_id: 'orgOne.id',
      name: 'pet john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'LOW'
    })


    await petsRepository.create({
      id: 'id_02',
      org_id: 'orgOne.id',
      name: 'pet john doe two',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'LOW',
      level_of_independence: 'HIGH',
      size: 'HIGH'
    })


    await petsRepository.create({
      id: 'id_03',
      org_id: 'orgTwo.id',
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'ELDERLY',
      energy_level: 'LOW',
      level_of_independence: 'LOW',
      size: 'MIDDLE',
    })


    await petsRepository.create({
      id: 'id_04',
      org_id: 'orgThree.id',
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'ELDERLY',
      energy_level: 'LOW',
      level_of_independence: 'LOW',
      size: 'MIDDLE'
    })


    const { pets } = await sut.execute({
      page: 1,
      age: 'CUB',
      energy_level: null,
      level_of_independence: null,
      size: null,
    })

    expect(pets).toHaveLength(2)
  })

  it('should return an empty array if nothing is found', async () => {

    const { pets } = await sut.execute({
      page: 1,
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'MIDDLE',
    })

    expect(pets).toHaveLength(0)
  })

  it('should be able to fetch paginated pet list', async () => {

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        id: `id_${i}`,
        org_id: `orgOne.id_${i}`,
        name: 'pet john doe',
        environment: 'aberto',
        requirements: ['limpo', 'alegre'],
        age: 'CUB',
        energy_level: 'MIDDLE',
        level_of_independence: 'MIDDLE',
        size: 'MIDDLE'
      })
    }

    const { pets } = await sut.execute({
      page: 2,
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
      size: 'MIDDLE',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'id_21' }),
      expect.objectContaining({ id: 'id_22' })
    ])
  })
})
