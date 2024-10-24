import { Prisma, Org } from '@prisma/client'
import { OrgRepositoryInterface } from '../org-repository-interface'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepositoryInterface {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = prisma.org.create({
      data,
    })

    return org
  }

  async findByUser(userId: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        user_id: userId,
      },
    })

    return org
  }

  async findById(orgId: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        id: orgId,
      },
    })

    return org
  }
}
