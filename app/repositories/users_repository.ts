import User from '#models/user'
import { inject } from '@adonisjs/core'
import { RepositoryContract } from '../contratcs/repositories.js'

@inject()
export class UsersRepository extends RepositoryContract.UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }
  async create(user: Partial<User>) {
    console.log(user)
    return await User.create(user)
  }
}
