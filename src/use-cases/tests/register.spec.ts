import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '../erros/user-alredy-exist-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to able to register with same email twice', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'john Doe',
      email,
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
    })

    expect(() =>
      sut.execute({
        name: 'john Doe',
        email,
        password: '123456',
        cep: '12345678',
        city: 'South Park',
        address: 'do lado da casa do Cartman',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be possible to get the address by CEP', async () => {
    const { user } = await sut.execute({
      name: 'john Doe',
      email: 'johnDoe@example.com',
      password: '123456',
      cep: '123456789',
    })

    expect(user.city).toEqual('South Park')
    expect(user.address).toEqual('Casa do Cartman')
  })

  it('should return an error if the CEP does not exist', async () => {
    await expect(() =>
      sut.execute({
        name: 'john Doe',
        email: 'johnDoe@example.com',
        password: '123456',
        cep: '000000000',
      }),
    ).rejects.toThrow('invalid address')
  })
})
