export const controllers = {
  NewAccount: () => import('#controllers/new_account_controller'),
  PreviewEmails: () => import('#controllers/preview_emails_controller'),
  Session: () => import('#controllers/session_controller'),
  Contacts: () => import('#controllers/contacts_controller'),
}
