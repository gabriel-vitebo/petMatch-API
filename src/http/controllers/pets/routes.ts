import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerPet } from './register-pet'
import { details } from './details'
import { fetchByCity } from './fetch-by-city'
import { fetchByCharacteristics } from './fetch-by-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)

  app.get('/pets/details/:petId', details)
  app.get('/pets/searchCity', fetchByCity)
  app.get('/pets/search', fetchByCharacteristics)
}
