import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class HistorialdeAtaque extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public enfrentamiento_id:number

  @column()
  public usuario_atacante_id: number

  @column()
  public usuario_atacado_id: number

  @column()
  public tipo_de_ataque:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
