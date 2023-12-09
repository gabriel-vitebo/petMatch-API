import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

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

  gettingCep(
    cep: number,
  ): Promise<{ city: string; neighborhood: string } | undefined> {
    throw new Error('Method not implemented.')
  }
}
