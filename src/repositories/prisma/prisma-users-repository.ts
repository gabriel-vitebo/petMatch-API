import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { z } from 'zod'

const cepResponseSchema = z.object({
  localidade: z.string(),
  bairro: z.string(),
})

export class PrismaUsersRepository implements UsersRepository {
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
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
