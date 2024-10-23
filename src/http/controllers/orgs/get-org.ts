import { ParameterNotFoundError } from '@/use-cases/Error/parameter-not-found-error'
import { makeGetUniqueOrg } from '@/use-cases/factory/make-get-unique-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const orgIdSchema = z.object({
    id: z.string(),
  })

  const { id } = orgIdSchema.parse(request.params)

  try {
    const getUniqueOrgUseCase = makeGetUniqueOrg()
    const { org } = await getUniqueOrgUseCase.execute({ orgId: id })
    return reply.status(200).send({ org })
  } catch (error) {
    if (error instanceof ParameterNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
