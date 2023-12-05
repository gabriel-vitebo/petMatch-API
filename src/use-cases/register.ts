import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: number
  city: string
  address: string
}

export async function registerUseCase({
  name,
  email,
  password,
  cep,
  city,
  address,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('email already exist')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      cep,
      city,
      address,
    },
  })
}
