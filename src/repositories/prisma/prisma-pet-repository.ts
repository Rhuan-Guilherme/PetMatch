import { Prisma, Pet } from '@prisma/client'
import { PetRepositoryInterface } from '../pet-repository-interface'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepositoryInterface {
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const org = await prisma.pet.create({
      data,
    })

    return org
  }
}
