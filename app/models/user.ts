import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { computed } from '@adonisjs/lucid/orm'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @computed()
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
