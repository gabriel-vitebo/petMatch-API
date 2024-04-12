import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Fetch Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const pet = await request(app.server)
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

    const response = await request(app.server)
      .get(`/pets/details/${pet.body.petId}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.data.pet).toEqual(
      expect.objectContaining({
        name: 'Coragem o Cão Covarde',
      }),
    )
    expect(response.body.contact).toEqual(
      expect.objectContaining({
        phoneNumber: '123456789',
      }),
    )
  })
})
