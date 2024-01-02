import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

class Address {
  constructor(
    public cep: string,
    public city: string,
    public neighborhood: string,
  ) {}
}

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      city: data.city || null,
      address: data.address || null,
      created_at: new Date(),
      phoneNumber: data.phoneNumber || null,
    }

    this.items.push(user)

    return user
  }

  async gettingCep(cep: string, city?: string, address?: string) {
    if (!city || !address) {
      if (cep === '000000000') {
        throw new Error('invalid address')
      }

      const userAddress = new Address(cep, 'South Park', 'Casa do Cartman')
      return userAddress
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
