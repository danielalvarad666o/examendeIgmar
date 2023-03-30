import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'historialdetriunfosyderrotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('enfrentamiento_id').unsigned().references('id').inTable('enfrentamientos')
      table.integer('usuario_ganador_id').unsigned().references('id').inTable('users')
      table.integer('usuario_perdedor_id').unsigned().references('id').inTable('users')
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
