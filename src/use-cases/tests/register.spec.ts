import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '../erros/user-alredy-exist-error'

describe('Register Use Case', () => {
  it('should be able to registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'john Doe',
      email: 'johndoe.email.com',
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'john Doe',
      email: 'johndoe.email.com',
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe.email.com'

    await registerUseCase.execute({
      name: 'john Doe',
      email,
      password: '123456',
      cep: '12345678',
      city: 'South Park',
      address: 'do lado da casa do Cartman',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'john Doe',
        email,
        password: '123456',
        cep: '12345678',
        city: 'South Park',
        address: 'do lado da casa do Cartman',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
