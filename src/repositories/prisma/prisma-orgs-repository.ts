import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { z } from 'zod'

const cepResponseSchema = z.object({
  localidade: z.string(),
  bairro: z.string(),
})

export class PrismaOrgsRepository implements OrgsRepository {
  async findByCity(citySearched: string) {
    const cities = await prisma.org.findMany({
      where: {
        city: citySearched
      }
    })

    const orgIds: string[] = cities.map(org => org.id);

    return orgIds;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async gettingCep(cep: string) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`)
      }

      const data = await response.json()

      const { localidade, bairro } = cepResponseSchema.parse(data)

      return {
        city: localidade,
        neighborhood: bairro,
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
