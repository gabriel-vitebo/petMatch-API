import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByCity(citySearched: string): Promise<Array<string>>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  gettingCep(
    cep: string,
  ): Promise<{ city: string; neighborhood: string } | undefined>
}
