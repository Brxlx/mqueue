import { userRoutes } from './user.routes.js'

/**
 * Registrador central de todas as rotas da aplicação.
 * Esta função será chamada no arquivo principal de rotas.
 */
export function registerAllRoutes() {
  userRoutes()
  // Registre outras rotas aqui
}
