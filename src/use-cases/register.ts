import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-alredy-exist-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  city?: string
  address?: string
}

interface RegisterUseCaseResponse {
  user: User
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const userAddress = await this.getAddress(cep, city, address)

    if (!userAddress) {
      throw new Error('invalid address')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      cep,
      city: userAddress?.city,
      address: userAddress?.neighborhood,
    })

    return { user }
  }

  private async getAddress(cep: string, city?: string, address?: string) {
    const correctedCep = cep.replace(/\D/g, '')

    if (!city || !address) {
      return await this.usersRepository.gettingCep(correctedCep)
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
