import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from '../get-org-profile'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get user profile', async () => {
    const createdOrg = await orgsRepository.create({
      person_responsible: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
      cep: '123456789',
      phoneNumber: '123456789',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    await expect(org.id).toEqual(expect.any(String))
    await expect(org.person_responsible).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
