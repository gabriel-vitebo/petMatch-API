import { Prisma, Org } from '@prisma/client'
import { create } from 'node:domain'
import { string } from 'zod'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByCity(citySearched: string): Promise<Array<string>>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  gettingCep(
    cep: string,
  ): Promise<{ city: string; neighborhood: string } | undefined>
}
