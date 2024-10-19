import { FastifyInstance } from 'fastify'
import { createUser } from './create-user'
import { authenticate } from './authenticate'

export function userRoutes(app: FastifyInstance) {
  app.post('/user/create', createUser)
  app.post('/user/session', authenticate)
}
