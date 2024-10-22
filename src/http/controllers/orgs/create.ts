import { OrgAlreadyExistsByUserError } from '@/use-cases/Error/org-already-exists-by-user-error'
import { ParameterNotFoundError } from '@/use-cases/Error/parameter-not-found-error'
import { makeCreateorg } from '@/use-cases/factory/make-create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    cidade: z.string(),
    phone: z.string(),
    description: z.string(),
  })

  const { cidade, description, name, phone } = createOrgSchema.parse(
    request.body,
  )

  try {
    const createOrgUseCase = makeCreateorg()
    const { org } = await createOrgUseCase.execute({
      cidade,
      description,
      name,
      phone,
      userId: request.user.sub,
    })

    return reply.status(201).send({ org })
  } catch (error) {
    if (
      error instanceof ParameterNotFoundError ||
      error instanceof OrgAlreadyExistsByUserError
    ) {
      return reply.status(401).send({ message: error.message })
    }
  }
}
