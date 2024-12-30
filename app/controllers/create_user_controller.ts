import type { HttpContext } from '@adonisjs/core/http'

export default class CreateUserController {
  /**
   * Handle to create a new user service
   */
  public async handle({ request, response }: HttpContext) {
    return {
      message: 'User created successfully',
    }
  }
}
