import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Fetch Pet By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server).post('/orgs').send({
      personResponsible: 'John Doe Two',
      orgName: 'John Doe Pets Two',
      email: 'johnDoe2@email.com',
      password: '123456',
      cep: '87309-680',
      phoneNumber: '12800800',
    })

    const orgTwo = await request(app.server).post('/sessions').send({
      email: 'johnDoe2@email.com',
      password: '123456',
    })

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${orgTwo.body.token}`)
      .send({
        name: 'Pata Mansa',
        about: 'Uma gatinha corajosa',
        age: 'CUB',
        size: 'LOW',
        energyLevel: 'HIGH',
        levelOfIndependence: 'MIDDLE',
        environment: 'junto com o gato de botas',
        requirements: ['muito carinho', 'muitas aventuras', 'poucos monstros'],
      })

    const response = await request(app.server)
      .get('/pets/searchCity')
      .query({
        citySearched: 'Campo Mourão',
      })
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Pata Mansa',
      }),
    ])
  })
})
