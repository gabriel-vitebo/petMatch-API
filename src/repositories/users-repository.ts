import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  gettingCep(
    cep: string,
  ): Promise<{ city: string; neighborhood: string } | undefined>
}
