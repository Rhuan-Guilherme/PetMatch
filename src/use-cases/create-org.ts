import { OrgRepositoryInterface } from '@/repositories/org-repository-interface'
import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { Org } from '@prisma/client'
import { ParameterNotFoundError } from './Error/parameter-not-found-error'
import { OrgAlreadyExistsByUserError } from './Error/org-already-exists-by-user-error'

interface CreateOrgRequest {
  name: string
  cidade: string
  phone: string
  description: string
  userId: string
}
interface CreateOrgResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgRepository: OrgRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    name,
    cidade,
    description,
    phone,
    userId,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ParameterNotFoundError()
    }

    const findOrgAlreadyExists = await this.orgRepository.findByUser(user.id)

    if (findOrgAlreadyExists) {
      throw new OrgAlreadyExistsByUserError()
    }

    const org = await this.orgRepository.create({
      cidade,
      description,
      name,
      phone,
      user: { connect: user },
    })

    return {
      org,
    }
  }
}
