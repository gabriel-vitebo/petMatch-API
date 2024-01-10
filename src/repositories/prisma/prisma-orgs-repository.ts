import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { z } from 'zod'

const cepResponseSchema = z.object({
  localidade: z.string(),
  bairro: z.string(),
})

export class PrismaOrgsRepository implements OrgsRepository {
  findById(id: string): Promise<{
    id: string
    org_name: string | null
    person_responsible: string
    cep: string
    address: string | null
    city: string | null
    email: string
    password_hash: string
    phoneNumber: string
    created_at: Date
  } | null> {
    throw new Error('Method not implemented.')
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
