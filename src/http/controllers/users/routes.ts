import { FastifyInstance } from 'fastify'
import { createUser } from './create-user'
import { authenticate } from './authenticate'
import { getUser } from './get-user'
import { verifyJWT } from '@/http/middlewares/jwt-verify'

export function userRoutes(app: FastifyInstance) {
  app.post('/user/create', createUser)
  app.post('/user/session', authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, getUser)
}
