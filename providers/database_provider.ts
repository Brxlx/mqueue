import { ApplicationService } from '@adonisjs/core/types'
import { Kernel } from '@adonisjs/core/ace'
import { inject } from '@adonisjs/core'
import { ParsedOutput } from '@adonisjs/core/types/ace'
import PingDatabase from '../commands/ping_database.js'
import { Database } from '@adonisjs/lucid/database'

/**
 * Provider responsável pela verificação de conectividade do banco de dados
 * @class DatabaseProvider
 * @description Implementa verificação de conectividade usando o container DI do AdonisJS
 */
export default class DatabaseProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Registra o comando no container de DI
   * @decorator @inject() - Garante que as dependências sejam resolvidas automaticamente
   */
  @inject()
  async register() {
    // Registra o Kernel como singleton
    this.app.container.singleton(Kernel, async () => {
      return new Kernel(this.app)
    })

    // Registra o comando com suas dependências
    this.app.container.singleton(PingDatabase, async (resolver) => {
      // const { default: PingDatabase } = await import('../commands/ping_database.js')
      const kernel = (await resolver.make(Kernel)) as Kernel

      const parsed: ParsedOutput = {
        _: [],
        _command: 'ping:database',
        args: [],
        nodeArgs: [],
        flags: [],
        unknownFlags: [],
      }
      const db = await this.app.container.make(Database)

      return new PingDatabase(this.app, kernel, parsed, kernel.ui, kernel.prompt, db)
    })
  }

  /**
   * Executa a verificação do banco de dados durante o boot
   * @decorator @inject() - Garante que as dependências sejam resolvidas automaticamente
   */
  @inject()
  async boot() {
    try {
      const command = await this.app.container.make(PingDatabase)
      await command.run()
    } catch (error) {
      console.error('[DatabaseProvider] Erro na verificação do banco:', error)

      process.exit(1)
    }
  }
}
