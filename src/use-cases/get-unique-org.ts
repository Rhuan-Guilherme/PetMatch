import { OrgRepositoryInterface } from '@/repositories/org-repository-interface'
import { Org } from '@prisma/client'
import { ParameterNotFoundError } from './Error/parameter-not-found-error'

interface GetOrgRequest {
  orgId: string
}
interface GetOrgResponse {
  org: Org
}

export class GetUniqueOrgUseCase {
  constructor(private orgRepository: OrgRepositoryInterface) {}

  async execute({ orgId }: GetOrgRequest): Promise<GetOrgResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ParameterNotFoundError()
    }

    return {
      org,
    }
  }
}
