import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'historialde_ataques'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('enfrentamiento_id').unsigned().references('id').inTable('enfrentamientos')
      table.integer('usuario_atacante_id').unsigned().references('id').inTable('users')
      table.integer('usuario_atacado_id').unsigned().references('id').inTable('users')
      table.string('tipo_de_ataque',500)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
