import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export class TraceSchema extends BaseModel {
  static $columns = [
    'id',
    'action',
    'url',
    'model',
    'payload',
    'author',
    'createdAt',
    'updatedAt',
  ] as const
  $columns = TraceSchema.$columns
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare action: string
  @column()
  declare url: string | null
  @column()
  declare model: any | null
  @column()
  declare payload: any
  @column()
  declare author: any | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class UserSchema extends BaseModel {
  static $columns = [
    'id',
    'firstName',
    'lastName',
    'email',
    'password',
    'createdAt',
    'updatedAt',
  ] as const
  $columns = UserSchema.$columns
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare firstName: string | null
  @column()
  declare lastName: string | null
  @column()
  declare email: string
  @column({ serializeAs: null })
  declare password: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
