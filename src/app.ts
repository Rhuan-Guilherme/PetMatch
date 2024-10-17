import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(userRoutes)
