import type { HttpContext } from '@adonisjs/core/http'

import app from '@adonisjs/core/services/app'
import { fsReadAll } from '@adonisjs/core/helpers'
import { UserFactory } from '#database/factories/user_factory'

export default class PreviewEmailsController {
  async index({ view }: HttpContext) {
    const files = await fsReadAll(new URL(app.viewsPath('mails'), import.meta.url))

    return view.render('preview_email', {
      files,
    })
  }
  async show({ view, params }: HttpContext) {
    const path = params['*'].join('/')
    const user = await UserFactory.create()

    return view.render(`mails/${path}`, {
      user,
    })
  }
}
