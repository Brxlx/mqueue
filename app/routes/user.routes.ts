import router from '@adonisjs/core/services/router'

const CreateUserController = () => import('#controllers/create_user_controller')

export function userRoutes() {
  router
    .group(() => {
      router.post('/users', [CreateUserController, 'handle'])
    })
    .prefix('/api/v1')
}
