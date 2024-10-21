import { Prisma, Org } from '@prisma/client'
import { OrgRepositoryInterface } from '../org-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryOrgRepository implements OrgRepositoryInterface {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      cidade: data.cidade,
      description: data.description,
      phone: data.phone,
      user_id: data.user as unknown as string,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
