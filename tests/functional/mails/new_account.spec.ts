import testUtils from '@adonisjs/core/services/test_utils'
import mail from '@adonisjs/mail/services/main'
import { test } from '@japa/runner'
import NewAccountNotification from '#mails/new_account_notification'
import { UserFactory } from '#database/factories/user_factory'

test.group('dealer mailer', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('create notification', async () => {
    const user = await UserFactory.create()

    const email = new NewAccountNotification(user)
    await email.buildWithContents()

    email.message.assertTo(user.email)
  })

  test('send notification', async () => {
    const { mails } = mail.fake()
    const user = await UserFactory.create()

    await mail.send(new NewAccountNotification(user))

    mails.assertSent(NewAccountNotification)
    mail.restore()
  })
})
