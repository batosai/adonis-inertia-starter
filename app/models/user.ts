import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { computed } from '@adonisjs/lucid/orm'
import { UuidPrimaryKey } from '#models/mixins/uuid_primary_key'

export default class User extends compose(UserSchema, UuidPrimaryKey, withAuthFinder(hash)) {
  @computed()
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
