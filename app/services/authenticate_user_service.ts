import { inject } from '@adonisjs/core'
import { RepositoryContract } from '../contratcs/repositories.js'
import { MismatchPasswordError, UserNotFoundError } from '#exceptions/user_service_errors'
import { Hash } from '@adonisjs/core/hash'
import { Argon } from '@adonisjs/core/hash/drivers/argon'

@inject()
export class AuthenticateUserService {
  constructor(private usersRepository: RepositoryContract.UsersRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const hash = new Hash(new Argon({}))
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new UserNotFoundError(email)
    }

    const hashedPassword = await hash.make(password)

    const isPasswordValid = await hash.verify(hashedPassword, password)

    if (!isPasswordValid) {
      throw new MismatchPasswordError()
    }

    const token = await this.usersRepository.createToken(user.id)

    return { token }
  }
}
