import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Coragem o Cão Covarde',
        about: 'Um cão muito corajoso',
        age: 'CUB',
        size: 'LOW',
        energyLevel: 'HIGH',
        levelOfIndependence: 'MIDDLE',
        environment: 'na cidade fictícia de Lugar Nenhum, no Kansas',
        requirements: ['muito carinho', 'muitas aventuras', 'poucos monstros'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
