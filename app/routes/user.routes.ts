import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
// import { middleware } from '#start/kernel'

const CreateUserController = () => import('#controllers/create_user_controller')
const AuthenticateUserController = () => import('#controllers/authenticate_user_controller')

export function userRoutes() {
  router
    .group(() => {
      router
        .post('/users', [CreateUserController, 'handle'])
        // .use(middleware.auth())
        .as('create_user')

      router.post('/users/session', [AuthenticateUserController, 'handle'])

      router
        .get('/teste', () => {
          return 'show de bola'
        })
        .use(middleware.auth())
    })
    .prefix('/api/v1')
}
