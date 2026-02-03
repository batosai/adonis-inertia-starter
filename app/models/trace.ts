import { TraceSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers'
import { UuidPrimaryKey } from '#models/mixins/uuid_primary_key'

export default class Trace extends compose(TraceSchema, UuidPrimaryKey) {}
