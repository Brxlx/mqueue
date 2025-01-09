import { inject } from '@adonisjs/core'
import { Hash } from '@adonisjs/core/hash'
import { Argon } from '@adonisjs/core/hash/drivers/argon'
import { InvalidPasswordError, UserAlreadyExistsError } from '#exceptions/user_service_errors'
import { RepositoryContract } from '../contratcs/repositories.js'

@inject()
export class CreateUserService {
  constructor(private usersRepository: RepositoryContract.UsersRepository) {}

  public async execute({ email, password }: { email: string; password: string }) {
    const existingUser = await this.usersRepository.findByEmail(email)
    if (existingUser) {
      throw new UserAlreadyExistsError(email)
    }

    if (password.length < 8) {
      throw new InvalidPasswordError()
    }

    const hashedPassword = await new Hash(new Argon({})).make(password)
    const user = await this.usersRepository.create({ email, passwordHash: hashedPassword })

    console.log('no service: ', user)

    return {
      email: user.email,
    }
  }
}
