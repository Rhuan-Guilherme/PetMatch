import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-reposiotry'

export function makeCreatePet() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const createPetUseCase = new CreatePetUseCase(petRepository, orgRepository)

  return createPetUseCase
}
