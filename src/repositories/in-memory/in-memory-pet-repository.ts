import { Prisma, Pet } from '@prisma/client'
import { PetRepositoryInterface } from '../pet-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetRepositoryInterface {
  public item: Pet[] = []

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      color: data.color,
      race: data.race,
      created_at: new Date(),
      org_id: data.org as unknown as string,
    }

    this.item.push(pet)

    return pet
  }
}
