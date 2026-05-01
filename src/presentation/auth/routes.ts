import type { RepositoryContainer } from '#shared/containers/repository.container.js';

import { AuthController } from '#presentation/auth/controller.js';
import { Router } from 'express';

export class AuthRoutes {
   static routes(container: RepositoryContainer) {
      const router = Router();
      const authController = new AuthController(container);

      router.post('/register-user', (req, res, next) => {
         Promise.resolve(authController.saveUser(req, res)).catch(next);
      });

      router.post('/login-user', (req, res, next) => {
         Promise.resolve(authController.loginUser(req, res)).catch(next);
      });

      return router;
   }
}
