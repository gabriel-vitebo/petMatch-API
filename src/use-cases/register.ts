import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-alredy-exist-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: number
  city?: string
  address?: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    city,
    address,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const userAddress = await this.getAddress(cep, city, address)

    if (!userAddress) {
      throw new Error('invalid address')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
      cep,
      city: userAddress?.city,
      address: userAddress?.neighborhood,
    })
  }

  private async getAddress(cep: number, city?: string, address?: string) {
    if (!city || !address) {
      return await this.usersRepository.gettingCep(cep)
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
