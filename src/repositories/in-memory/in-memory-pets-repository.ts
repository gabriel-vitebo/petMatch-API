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

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      org_id: data.org_id,
      name: data.name,
      about: data.about || null,
      age: data.age || 'CUB' || 'ELDERLY',
      energy_level: data.energy_level || 'LOW' || 'HIGH',
      environment: data.environment,
      level_of_independence: data.level_of_independence || 'LOW' || 'HIGH',
      requirements: data.requirements,
      size: data.size || 'LOW' || 'HIGH',
      photo: data.photo || null,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
