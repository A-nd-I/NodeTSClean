import type { PwdHasherPort } from '#domain/auth/ports/pwd-hasher.js';
import type { AuthRepository } from '#domain/auth/repository/repository.js';
import type { RepositoryContainer } from '#shared/containers/repository.container.js';
import type { Request, Response } from 'express';

import { LoginUser } from '#domain/auth/usecases/login-user.usecase.js';
import { SaveUser } from '#domain/auth/usecases/save-user.usecase.js';
import { OuterResponseType } from '#shared/kernel/types/response.type.js';
import { logger } from '#shared/pkg/logger/logger.js';

export class AuthController {
   private readonly authRepository: AuthRepository;
   private readonly pwdHasher: PwdHasherPort;

   constructor(container: RepositoryContainer) {
      this.authRepository = container.getAuthRepository();
      this.pwdHasher = container.getPwdHasher();
   }

   public loginUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const loginUser = await new LoginUser({
         authRepository: this.authRepository,
         errorCallback: (error) => {
            logger.error('error in login user in controller: ' + error);
         },
         pwdHasherPort: this.pwdHasher,
         successCallback: () => {
            logger.info('success in login user in controller');
         },
      }).execute(user_name, pwd);

      let outerResponse: OuterResponseType;

      if (!loginUser.success) {
         outerResponse = {
            response: `Error in login user in controller - response from usecase: ${loginUser.message}`,
            success: false,
         };
         return res.json(outerResponse);
      }

      outerResponse = {
         response: `${loginUser.data.user_name} authenticated successfully`,
         success: loginUser.success,
      };
      return res.json(outerResponse);
   };

   public saveUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const newUser = await new SaveUser({
         authRepository: this.authRepository,
         errorCallback: (error) => {
            logger.error('error in save user in controller: ' + error);
         },
         pwdHasherPort: this.pwdHasher,
         successCallback: () => {
            logger.info('success in save user in controller');
         },
      }).execute(user_name, pwd);

      let outerResponse: OuterResponseType;

      if (!newUser.success) {
         outerResponse = {
            response: `Error in save user in controller - response from usecase: ${newUser.message}`,
            success: false,
         };
         return res.json(outerResponse);
      }

      outerResponse = {
         response: `${newUser.data.user_name} created successfully`,
         success: newUser.success,
      };
      return res.json(outerResponse);
   };
}
