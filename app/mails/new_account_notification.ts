import type User from '#models/user'

import BaseNotification from '#mails/base_notification'

export default class NewAccountNotification extends BaseNotification {
  constructor(
    private user: User,
    lang?: string
  ) {
    super(lang)
  }

  prepare() {
    this.message
      .to(this.user.email)
      .subject(this.i18n.t(`mail.welcome`))
      .htmlView('mails/new_account', {
        i18n: this.i18n,
        user: this.user,
      })
  }
}
