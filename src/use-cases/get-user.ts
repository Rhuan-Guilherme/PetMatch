import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { User } from '@prisma/client'
import { ParameterNotFoundError } from './Error/parameter-not-found-error'

interface GetUserRequest {
  userId: string
}

interface GetUserResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userReposiotry: UserRepositoryInterface) {}

  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userReposiotry.findById(userId)

    if (!user) {
      throw new ParameterNotFoundError()
    }

    return { user }
  }
}
