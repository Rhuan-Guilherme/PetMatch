import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-reposiotry'
import { GetUniqueOrgUseCase } from '../get-unique-org'

export function makeGetUniqueOrg() {
  const orgRepository = new PrismaOrgRepository()
  const getUniqueOrgUseCase = new GetUniqueOrgUseCase(orgRepository)

  return getUniqueOrgUseCase
}
