import { inject } from '@adonisjs/core'
import { Hash } from '@adonisjs/core/hash'
import { Argon } from '@adonisjs/core/hash/drivers/argon'
import type { UsersRepositoryInterface } from '#repositories/users_repository_interface.js'
// import { UsersRepository } from '#repositories/users_repository.js'
@inject()
export class CreateUserService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  public async execute({ email, password }: { email: string; password: string }) {
    const hashedPassword = await new Hash(new Argon({})).make(password)
    const user = await this.usersRepository.create({ email, passwordHash: hashedPassword })
  }
}
