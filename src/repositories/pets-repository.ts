import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findManyByCityOfTheOrg(org_id: string[], page: number): Promise<Array<Pet> | []>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
