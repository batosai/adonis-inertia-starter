import type { HttpContext } from '@adonisjs/core/http'

// Données statiques pour la démo
const CONTACTS = [
  { id: '1', name: 'Alice Martin', email: 'alice@example.com' },
  { id: '2', name: 'Bob Dupont', email: 'bob@example.com' },
  { id: '3', name: 'Claire Bernard', email: 'claire@example.com' },
  { id: '4', name: 'David Leroy', email: 'david@example.com' },
  { id: '5', name: 'Emma Petit', email: 'emma@example.com' },
]

export default class ContactsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('contacts/Index', { contacts: CONTACTS })
  }

  async show({ inertia, params, response }: HttpContext) {
    const contact = CONTACTS.find((c) => c.id === params.id)
    if (!contact) return response.redirect().back()
    return inertia.render('contacts/Show', { contact })
  }
}
