import { ApplicationService } from '@adonisjs/core/types'
import { UsersRepository } from '../app/repositories/users_repository.js'
import { CreateUserService } from '#services/create_user_service'
import { RepositoryContract } from '../app/contratcs/repositories.js'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.bind(RepositoryContract.UsersRepository, async () => {
      return new UsersRepository()
    })

    // Registra o service
    this.app.container.bind(CreateUserService, async () => {
      const repo = await this.app.container.make(RepositoryContract.UsersRepository)
      return new CreateUserService(repo)
    })
  }

  async boot() {
    // Código de inicialização, se necessário
  }

  async ready() {
    // Código a ser executado quando a aplicação estiver pronta
  }

  async shutdown() {
    // Código de limpeza quando a aplicação for encerrada
  }
}
