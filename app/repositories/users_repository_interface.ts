import User from '#models/user'

export interface UsersRepositoryInterfaceOld {
  findByEmail(email: string): Promise<User | null>
  create(data: Partial<User>): Promise<User> // Partial<User> permite passar apenas os campos necessários
}
