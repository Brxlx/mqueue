import { CreateUserValidator } from '#validators/create_user_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { CreateUserService } from '#services/create_user_service'

@inject()
export default class CreateUserController {
  constructor(private createuserService: CreateUserService) {}
  /**
   * Handle to create a new user service
   */
  public async handle({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(CreateUserValidator)

    const user = await this.createuserService.execute({ email, password })
    return response.status(201).json(user)
  }
}
