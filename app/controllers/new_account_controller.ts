import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { signupValidator } from '#validators/user'
import mail from '@adonisjs/mail/services/main'
import NewAccountNotification from '#mails/new_account_notification'

export default class NewAccountController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/Index', { tab: 'signup' })
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create({ ...payload })

    if (user) {
      await mail.sendLater(new NewAccountNotification(user, 'fr'))
    }

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
