import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      personResponsible: 'John Doe',
      orgName: 'John Doe Pets',
      email: 'johnDoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'petLand',
      address: 'petStreet',
      phoneNumber: '123456789',
    })

    expect(response.statusCode).toEqual(201)
  })
})
