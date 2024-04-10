import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile', async () => {
    await request(app.server).post('/orgs').send({
      personResponsible: 'John Doe',
      orgName: 'John Doe Pets',
      email: 'johnDoe@email.com',
      password: '123456',
      cep: '12345678',
      city: 'petLand',
      address: 'petStreet',
      phoneNumber: '123456789',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johnDoe@email.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'johnDoe@email.com',
      }),
    )
  })
})
