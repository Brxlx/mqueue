import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('password', 'password_hash')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
