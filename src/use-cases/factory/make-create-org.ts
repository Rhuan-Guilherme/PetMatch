import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-reposiotry'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-reposiotry'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateorg() {
  const userRepository = new PrismaUserRepository()
  const orgRepository = new PrismaOrgRepository()
  const createOrgUseCase = new CreateOrgUseCase(orgRepository, userRepository)

  return createOrgUseCase
}
