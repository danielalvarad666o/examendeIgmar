import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTokens extends BaseSchema {
  protected tableName = 'tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.string('type', 80).notNullable()
      table.string('token', 500).notNullable().unique()
      table.timestamp('expires_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
