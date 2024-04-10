import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  return { token }
}
