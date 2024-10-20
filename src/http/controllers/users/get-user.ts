import { ParameterNotFoundError } from '@/use-cases/Error/parameter-not-found-error'
import { makeGetUser } from '@/use-cases/factory/make-get-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserSchema = z.string().uuid()
  const userId = getUserSchema.parse(request.user.sub)

  try {
    const getUserUseCase = makeGetUser()
    const { user } = await getUserUseCase.execute({ userId })
    return reply.status(200).send({ ...user, password_hash: undefined })
  } catch (error) {
    if (error instanceof ParameterNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
