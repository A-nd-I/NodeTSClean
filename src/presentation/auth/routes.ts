import { AuthController } from '#presentation/auth/controller.js';
import { Router } from 'express';

export class AuthRoutes {
   static get routes() {
      const router = Router();
      const authController = new AuthController();

      router.post('/register-user', (req, res, next) => {
         Promise.resolve(authController.saveUser(req, res)).catch(next);
      });

      //router.use('/sign-in', ()=>{});

      return router;
   }
}
