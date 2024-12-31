import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import { ServiceError } from './service_error.js'
import { errors } from '@vinejs/vine'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof ServiceError) {
      return ctx.response.status(error.statusCode).json({
        code: error.code,
        message: error.message,
        status: error.statusCode,
      })
    }

    if (error instanceof Exception) {
      return ctx.response.status(error.status).json({
        code: 'UNHANDLED_EXCEPTION',
        message: error.message,
        status: error.status,
      })
    }

    if (error instanceof errors.E_VALIDATION_ERROR) {
      return ctx.response.status(422).json({
        code: 'VALIDATION_ERROR',
        message: 'Validation Failed',
        errors: error.messages,
        status: 422,
      })
    }

    // Log erro não tratado para monitoramento
    console.error('Erro não tratado:', error)

    return ctx.response.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocorreu um erro interno no servidor',
      status: 500,
    })
    // return super.handle(error, ctx)
  } /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    if (error instanceof ServiceError) {
      return // Skip reporting for handled service errors
    }

    return super.report(error, ctx)
  }
}
