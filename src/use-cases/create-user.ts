import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}
interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const findUserEmail = await this.userRepository.findByEmail(email)

    if(findUserEmail){
      throw new Error('O e-mail informando ja está cadastrado')
    }

    const passwordHash = await hash(password, 6)

    const user = await this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
