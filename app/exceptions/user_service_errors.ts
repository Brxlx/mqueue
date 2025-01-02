import { ServiceError } from './service_error.js'

export class UserNotFoundError extends ServiceError {
  constructor(email: string) {
    super(`Usuário com email ${email} não encontrado`, 'USER_NOT_FOUND', 404)
  }
}

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

export class MismatchPasswordError extends ServiceError {
  constructor() {
    super('As senhas não conferem', 'MISMATCH_PASSWORD', 400)
  }
}
