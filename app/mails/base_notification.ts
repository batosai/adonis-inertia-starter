import type { I18n } from '@adonisjs/i18n'

import { BaseMail } from '@adonisjs/mail'
import i18nManager from '@adonisjs/i18n/services/main'

/* Email de notification de nouveau prospect */
export default abstract class BaseNotification extends BaseMail {
  from = 'sender_email@example.org'
  i18n: I18n

  constructor(lang: string = i18nManager.defaultLocale) {
    super()

    this.i18n = i18nManager.locale(lang)
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {}
}
