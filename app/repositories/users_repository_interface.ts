import User from '#models/user'

export interface UsersRepositoryInterface {
  create(data: Partial<User>): Promise<User> // Partial<User> permite passar apenas os campos necessários
}
