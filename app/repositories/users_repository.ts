import User from '#models/user'
import { inject } from '@adonisjs/core'
import { RepositoryContract } from '../contratcs/repositories.js'

@inject()
export class UsersRepository extends RepositoryContract.UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  async verifyPassword(userId: string, hashedPassword: string): Promise<boolean> {
    const res = await User.query()
      .where('id', userId)
      .where('password_hash', hashedPassword)
      .first()

    return !!res
  }

  async create(user: Partial<User>) {
    console.log(user)
    return await User.create(user)
  }

  async createToken(userId: string): Promise<string> {
    const user = await User.findOrFail(userId)
    const token = await User.accessTokens.create(user)

    return token.value!.release()
  }
}
