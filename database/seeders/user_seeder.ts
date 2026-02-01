import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      lastName: 'Doe',
      firstName: 'John',
      email: 'admin@adonisjs.com',
      password: 'secret',
    })
  }
}
