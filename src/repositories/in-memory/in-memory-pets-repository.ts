import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      energyLevel: data.energy_level,
      environment: data.environment,
      levelOfIndependence: data.level_of_independence,
      requirements: data.requirements ?? [],
      size: data.size,
      photo: data.photo ?? null,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
