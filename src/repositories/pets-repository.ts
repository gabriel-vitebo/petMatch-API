import { Age, Characteristics, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findManyByCityOfTheOrg(org_id: string[], page: number): Promise<Array<Pet> | []>
  findManyByCharacteristics(
    age: Age | null,
    energyLevel: Characteristics | null,
    levelOfIndependence: Characteristics | null,
    size: Characteristics | null
  ): Promise<Array<Pet> | []>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
