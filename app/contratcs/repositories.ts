import User from '#models/user'

/**
 * Namespace para organizar as interfaces de repositório
 * Isso permite que usemos as interfaces como tokens de injeção
 */
export namespace RepositoryContract {
  export abstract class UsersRepository {
    abstract findByEmail(email: string): Promise<User | null>
    abstract verifyPassword(userId: string, hashedPassword: string): Promise<boolean>
    abstract createToken(userId: string): Promise<string>
    abstract create(data: Partial<User>): Promise<User>
  }
}
