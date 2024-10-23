import { Org, Prisma } from '@prisma/client'

export interface OrgRepositoryInterface {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByUser(userId: string): Promise<Org | null>
  findById(orgId: string): Promise<Org | null>
}
