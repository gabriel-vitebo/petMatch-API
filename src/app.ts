import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Gabriel Vitebo',
    email: 'vitebo@test.com',
    address: 'essa rua',
    cep: 123456,
    city: 'são jose dos campos',
    password: '234',
    phoneNumber: 123456,
  },
})
