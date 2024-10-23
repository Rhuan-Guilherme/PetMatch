import { OrgRepositoryInterface } from '@/repositories/org-repository-interface'
import { PetRepositoryInterface } from '@/repositories/pet-repository-interface'
import { Pet } from '@prisma/client'
import { ParameterNotFoundError } from './Error/parameter-not-found-error'

interface CreatePetRequest {
  name: string
  age: number
  race: 'DOG' | 'CAT' | 'OTHERS'
  color: string
  org_id: string
}
interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepositoryInterface,
    private orgRepository: OrgRepositoryInterface,
  ) {}

  async execute({
    age,
    color,
    name,
    org_id,
    race,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new ParameterNotFoundError()
    }

    const pet = await this.petRepository.create({
      age,
      color,
      name,
      race,
      org: { connect: org },
    })

    return {
      pet,
    }
  }
}
