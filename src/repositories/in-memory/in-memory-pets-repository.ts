import { $Enums, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyByCharacteristics(
    page: number,
    age: $Enums.Age | null,
    energyLevel: $Enums.Characteristics | null,
    levelOfIndependence: $Enums.Characteristics | null,
    size: $Enums.Characteristics | null) {
    let filteredPets = this.items

    if (age) {
      filteredPets = filteredPets.filter((item) => item.age === age)
    }

    if (energyLevel) {
      filteredPets = filteredPets.filter((item) => item.energy_level === energyLevel)
    }

    if (levelOfIndependence) {
      filteredPets = filteredPets.filter((item) => item.level_of_independence === levelOfIndependence)
    }

    if (size) {
      filteredPets = filteredPets.filter((item) => item.size === size)
    }

    return filteredPets.slice((page - 1) * 20, page * 20);

  }
  async findManyByCityOfTheOrg(org_id: string[], page: number) {
    const petsMatched: Pet[] = []

    org_id.forEach((org_id) => {
      const petsOfOrg = this.items
        .filter((item) => item.org_id === org_id)
        .slice((page - 1) * 20, page * 20);
      petsMatched.push(...petsOfOrg);
    });

    return petsMatched.length > 0 ? petsMatched : [];
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      org_id: data.org_id,
      name: data.name,
      about: data.about || null,
      age: data.age || 'CUB' || 'ELDERLY',
      energy_level: data.energy_level || 'LOW' || 'HIGH',
      environment: data.environment,
      level_of_independence: data.level_of_independence || 'LOW' || 'HIGH',
      requirements: data.requirements || [],
      size: data.size || 'LOW' || 'HIGH',
      photo: data.photo || null,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
