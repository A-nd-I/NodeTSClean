import type { PwdHasherPort } from '#domain/auth/ports/pwd-hasher.js';
import type { AuthRepository } from '#domain/auth/repository/repository.js';
import type { RepositoryContainer } from '#shared/containers/repository.container.js';
import type { Request, Response } from 'express';

import { LoginUser } from '#domain/auth/usecases/login-user.usecase.js';
import { SaveUser } from '#domain/auth/usecases/save-user.usecase.js';
import {
   errorPresenter,
   successPresenter,
} from '#presentation/auth/presenters/index.js';
import { logger } from '#shared/pkg/logger/logger.js';

const getStatusCode = (error: unknown): number => {
   if (error && typeof error === 'object' && 'statusCode' in error) {
      const code = (error as Record<string, unknown>).statusCode;
      return typeof code === 'number' ? code : 500;
   }
   return 500;
};

export class AuthController {
   private readonly authRepository: AuthRepository;
   private readonly pwdHasher: PwdHasherPort;

   constructor(container: RepositoryContainer) {
      this.authRepository = container.getAuthRepository();
      this.pwdHasher = container.getPwdHasher();
   }

   public loginUser = async (req: Request, res: Response) => {
      try {
         const body = req.body as {
            pwd: string;
            user_name: string;
         };
         const { pwd, user_name } = body;

         logger.info({ userName: user_name }, 'Login request received');

         const result = await new LoginUser({
            authRepository: this.authRepository,
            pwdHasherPort: this.pwdHasher,
         }).execute(user_name, pwd);

         const presenter = successPresenter(result);
         return res.json(presenter);
      } catch (error: unknown) {
         const presenter = errorPresenter(error);
         logger.error({ error }, presenter.response);

         const statusCode = getStatusCode(error);
         return res.status(statusCode).json(presenter);
      }
   };

   public saveUser = async (req: Request, res: Response) => {
      try {
         const body = req.body as {
            pwd: string;
            user_name: string;
         };
         const { pwd, user_name } = body;

         logger.info({ userName: user_name }, 'Registration request received');

         const result = await new SaveUser({
            authRepository: this.authRepository,
            pwdHasherPort: this.pwdHasher,
         }).execute(user_name, pwd);

         const presenter = successPresenter(result);
         return res.json(presenter);
      } catch (error: unknown) {
         const presenter = errorPresenter(error);
         logger.error({ error }, presenter.response);

         const statusCode = getStatusCode(error);
         return res.status(statusCode).json(presenter);
      }
   };
}
