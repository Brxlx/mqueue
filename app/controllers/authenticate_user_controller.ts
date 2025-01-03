import { AuthenticateUserService } from '#services/authenticate_user_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}
  public async handle({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const { token } = await this.authenticateUserService.execute({ email, password })

    return response.status(200).json({
      token: token,
    })
  }
}
