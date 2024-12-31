import { ServiceError } from './service_error.js'

export class UserAlreadyExistsError extends ServiceError {
  constructor(email: string) {
    super(
      `Usuário com email ${email} já existe`,
      'USER_ALREADY_EXISTS',
      409 // Conflict
    )
  }
}

export class InvalidPasswordError extends ServiceError {
  constructor() {
    super('A senha fornecida não atende aos requisitos mínimos', 'INVALID_PASSWORD', 400)
  }
}
