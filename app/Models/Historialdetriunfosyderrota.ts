import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Historialdetriunfosyderrota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public enfrentamiento_id:number

  @column()
  public usuario_ganador_id:number

  @column()
  public usuario_perdedor_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
