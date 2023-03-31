import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Enfrentamiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

@column()
public nombre:string

@column()
public status:number

  @column()
  public id_usuario1: number

  @column()
  public id_usuario2: number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
