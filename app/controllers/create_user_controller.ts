import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { CreateUserService } from '#services/create_user_service'

@inject()
export default class CreateUserController {
  constructor(private createuserService: CreateUserService) {}
  /**
   * Handle to createNewUserService
   */
  public async handle({ request, response }: HttpContext) {
    // const { email, password } = await request.validateUsing(CreateUserValidator)
    const { email, password } = request.only(['email', 'password'])

    const user = await this.createuserService.execute({ email, password })
    return response.status(201).json(user)
  }
}
