import { $Enums, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCityOfTheOrg(org_id: string[], page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: org_id
        },
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return pets
  }

  async findManyByCharacteristics(page: number, age: $Enums.Age | null, energyLevel: $Enums.Characteristics | null, levelOfIndependence: $Enums.Characteristics | null, size: $Enums.Characteristics | null) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy_level: energyLevel,
        level_of_independence: levelOfIndependence,
        size,
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

}