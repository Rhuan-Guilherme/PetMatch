import { InvalidCredentialsError } from '@/use-cases/Error/invalid-credentials-error'
import { makeAuthenticate } from '@/use-cases/factory/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticate()
    const { user } = await authenticateUseCase.execute({ email, password })
    const token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
