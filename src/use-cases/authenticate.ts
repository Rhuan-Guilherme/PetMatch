import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './Error/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordHashed = await compare(password, user.password_hash)

    if (!passwordHashed) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
