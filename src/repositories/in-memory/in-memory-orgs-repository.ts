import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

class Address {
  constructor(
    public cep: string,
    public city: string,
    public neighborhood: string,
  ) {}
}

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const user = {
      id: 'user-1',
      person_responsible: data.person_responsible,
      org_name: data.org_name || null,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      city: data.city || null,
      address: data.address || null,
      created_at: new Date(),
      phoneNumber: data.phoneNumber,
    }

    this.items.push(user)

    return user
  }

  async gettingCep(cep: string, city?: string, address?: string) {
    if (!city || !address) {
      if (cep === '000000000') {
        throw new Error('invalid address')
      }

      const userAddress = new Address(cep, 'South Park', 'Casa do Cartman')
      return userAddress
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
