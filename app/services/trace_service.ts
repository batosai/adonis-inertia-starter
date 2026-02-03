import type { LucidRow } from '@adonisjs/lucid/types/model'
import type User from '#models/user'
import Trace from '#models/trace'

type ParamsLog = {
  row: LucidRow
  user?: User
  method: string
  url: string
}

export class TraceService {
  format({ row, user, method, url }: ParamsLog) {
    const original = this.#pick(
      row.$original,
      Object.keys(row.$dirty) as (keyof typeof row.$original)[]
    )

    const payload = {
      original: original,
      dirty: row.$dirty,
    }

    const author = user
      ? {
          primaryKey: user.$primaryKeyValue?.toString(),
          fullName: user.fullName,
        }
      : undefined

    if (Object.values(payload).some((obj) => Object.keys(obj).length)) {
      return {
        action: method,
        url,
        model: {
          name: row.constructor.name,
          primaryKey: row.$primaryKeyValue?.toString(),
        },
        payload,
        author,
      }
    }
  }

  async log(traces: Record<string, unknown>[]) {
    console.log(traces)
    return Trace.createMany(traces)
  }

  #pick<T extends object, K extends readonly (keyof T)[]>(obj: T, keys: K): Pick<T, K[number]> {
    return Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K[number]>
  }
}
