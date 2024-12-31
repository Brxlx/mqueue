import User from '#models/user'

/**
 * Namespace para organizar as interfaces de repositório
 * Isso permite que usemos as interfaces como tokens de injeção
 */
export namespace RepositoryContract {
  export abstract class UsersRepository {
    abstract create(data: Partial<User>): Promise<User>
  }
}
