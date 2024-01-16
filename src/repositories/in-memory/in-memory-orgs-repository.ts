import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

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
    const org = {
      id: randomUUID(),
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

    this.items.push(org)

    return org
  }

  async gettingCep(cep: string, city?: string, address?: string) {
    if (!city || !address) {
      if (cep === '000000000') {
        throw new Error('invalid address')
      }

      const orgAddress = new Address(
        cep,
        'South Park',
        'do lado da casa do Cartman',
      )
      return orgAddress
    }

    return {
      city,
      neighborhood: address,
    }
  }
}
