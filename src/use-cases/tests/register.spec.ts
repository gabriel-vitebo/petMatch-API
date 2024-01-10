import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '../erros/org-already-exist-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      personResponsible: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
      phoneNumber: '123456789',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      personResponsible: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
      phoneNumber: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to able to register with same email twice', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      personResponsible: 'john Doe',
      email,
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
      phoneNumber: '123456879',
    })

    expect(() =>
      sut.execute({
        personResponsible: 'john Doe',
        email,
        password: '123456',
        cep: '12345678',
        city: 'South Park',
        address: 'do lado da casa do Cartman',
        phoneNumber: '123456879',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be possible to get the address by CEP', async () => {
    const { org } = await sut.execute({
      personResponsible: 'john Doe',
      email: 'johnDoe@example.com',
      password: '123456',
      cep: '123456789',
      phoneNumber: '123456879',
    })

    expect(org.city).toEqual('South Park')
    expect(org.address).toEqual('do lado da casa do Cartman')
  })

  it('should return an error if the CEP does not exist', async () => {
    await expect(() =>
      sut.execute({
        personResponsible: 'john Doe',
        email: 'johnDoe@example.com',
        password: '123456',
        cep: '000000000',
        phoneNumber: '123456879',
      }),
    ).rejects.toThrow('invalid address')
  })
})
