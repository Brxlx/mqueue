import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UsersRepositoryInterface } from './users_repository_interface.js'
import { RepositoryContract } from '../contratcs/repositories.js'

@inject()
export class UsersRepository
  extends RepositoryContract.UsersRepository
  implements UsersRepositoryInterface
{
  async create(user: Partial<User>) {
    console.log(user)
    return await User.create(user)
  }
}
