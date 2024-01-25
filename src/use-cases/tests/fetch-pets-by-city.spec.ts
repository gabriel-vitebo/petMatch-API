import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetByCityUseCase } from '../fetch-pets-by-city'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCityUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCityUseCase(petsRepository, orgsRepository)
  })

  it('should be able to possible to list all the pets in a city', async () => {
    const orgOne = await orgsRepository.create({
      city: 'São José dos Campos',
      cep: '000000000',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
      person_responsible: 'John Doe',
      phoneNumber: '123456789'
    })

    const orgTwo = await orgsRepository.create({
      city: 'São José dos Campos',
      cep: '000000000',
      email: 'johndoeTwo@email.com',
      password_hash: await hash('123456', 6),
      person_responsible: 'John Doe',
      phoneNumber: '123456789'
    })


    const orgThree = await orgsRepository.create({
      city: 'Salvador',
      cep: '000000000',
      email: 'johndoeThree@email.com',
      password_hash: await hash('123456', 6),
      person_responsible: 'John Doe',
      phoneNumber: '123456789'
    })


    await petsRepository.create({
      id: 'id_01',
      org_id: orgOne.id,
      name: 'pet john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
    })


    await petsRepository.create({
      id: 'id_02',
      org_id: orgOne.id,
      name: 'pet john doe two',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
    })


    await petsRepository.create({
      id: 'id_03',
      org_id: orgTwo.id,
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
    })


    await petsRepository.create({
      id: 'id_04',
      org_id: orgThree.id,
      name: 'pet other john doe',
      environment: 'aberto',
      requirements: ['limpo', 'alegre'],
      age: 'CUB',
      energy_level: 'MIDDLE',
      level_of_independence: 'MIDDLE',
    })


    const { pets } = await sut.execute({
      citySearched: 'São José dos Campos',
    })

    expect(pets).toHaveLength(3)

  })
})
