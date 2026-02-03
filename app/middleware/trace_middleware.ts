import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { LucidRow } from '@adonisjs/lucid/types/model'

import { inject } from '@adonisjs/core'
import { TraceService } from '#services/trace_service'

@inject()
export default class TraceMiddleware {
  constructor(protected traceService: TraceService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    ctx.trace = (entity: LucidRow) => {
      const log = this.traceService.format({
        row: entity,
        user: ctx.auth?.user,
        method: ctx.request.method(),
        url: ctx.request.url(),
      })
      if (log) {
        ctx.traces.push(log)
      }
    }
    ctx.traces = []

    const output = await next()

    try {
      if (ctx.response.getStatus() === 200 && ctx.traces?.length) {
        this.traceService.log(ctx.traces)
      }
    } catch (e) {}

    return output
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    trace(row: LucidRow): void
    traces: Record<string, unknown>[]
  }
}
