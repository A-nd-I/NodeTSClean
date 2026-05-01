import type { RepositoryContainer } from '#shared/containers/repository.container.js';

import { Router } from 'express';

import { AuthRoutes } from './auth/routes.js';

export class AppRoutes {
   static get routes() {
      return (container: RepositoryContainer) => {
         const router = Router();

         router.use('/auth', AuthRoutes.routes(container));

         return router;
      };
   }
}
