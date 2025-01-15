import { inject } from '@adonisjs/core'
import { BaseCommand, Kernel } from '@adonisjs/core/ace'
import { ApplicationService } from '@adonisjs/core/types'
import type { CommandOptions, ParsedOutput } from '@adonisjs/core/types/ace'
import { Database } from '@adonisjs/lucid/database'

export default class PingDatabase extends BaseCommand {
  static commandName = 'ping:database' as const
  static description = 'Check the database connection'
  static help?: string | string[] | undefined = 'This command checks the database connection'

  static options: CommandOptions = {
    startApp: true,
    environment: true,
  }

  /**
   * Flag para controlar se a conexão já foi testada
   */
  private hasRun = false

  constructor(
    app: ApplicationService,
    kernel: Kernel,
    parsed: ParsedOutput,
    ui: Kernel['ui'],
    prompt: Kernel['prompt'],
    private db: Database
  ) {
    super(app, kernel, parsed, ui, prompt)
  }

  @inject()
  async run() {
    if (this.hasRun) {
      return
    }

    try {
      const startTime = performance.now()
      this.db.manager.connect('postgres')
      await this.db.rawQuery('SELECT 1')

      const duration = Math.round(performance.now() - startTime)

      this.logger.success(`Connected to database! (${duration}ms)`)
      await this.db.manager.close('postgres')
    } catch (err) {
      this.logger.error('Database connection failed')
      throw err
    } finally {
      this.hasRun = true
      await this.db.manager.close('postgres')
    }
  }
}
