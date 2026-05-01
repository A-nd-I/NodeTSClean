import { LoginUser } from '#domain/auth/usecases/login-user.usecase.js';
import { SaveUser } from '#domain/auth/usecases/save-user.usecase.js';
//import { FileSystemDatasource } from '#infrastructure/auth/datasources/file-system.js';
import { PrimaPostgresqlDatasource } from '#infrastructure/auth/datasources/prisma-postgresql.js';
import { BcryptPwdHasher } from '#infrastructure/auth/ports/bcrypt-pwd-hasher.js';
import { AuthRepositoryImpl } from '#infrastructure/auth/repositories/repository.impl.js';
import { logger } from '#shared/pkg/logger/logger.js';
import { Request, Response } from 'express';

//const fsAuthRepository = new AuthRepositoryImpl(new FileSystemDatasource());
const pgAuthRepository = new AuthRepositoryImpl(
   new PrimaPostgresqlDatasource(),
);

const bcryptPwdHasher = new BcryptPwdHasher();

export class AuthController {
   public loginUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const loginUser = await new LoginUser({
         authRepository: pgAuthRepository,
         errorCallback: (error) => {
            logger.error('error in login user in controller: ' + error);
         },
         pwdHasherPort: bcryptPwdHasher,
         successCallback: () => {
            logger.info('success in login user in controller');
         },
      }).execute(user_name, pwd);

      return res.json({
         response: `${loginUser.data.user_name} authenticated successfully`,
         success: loginUser.success,
         message: loginUser.message,
      });
   };

   public saveUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const newUser = await new SaveUser({
         authRepository: pgAuthRepository,
         errorCallback: (error) => {
            logger.error('error in save user in controller: ' + error);
         },
         pwdHasherPort: bcryptPwdHasher,
         successCallback: () => {
            logger.info('success in save user in controller');
         },
      }).execute(user_name, pwd);

      if (!newUser.success) {
         return res.json({
            response: `Error in save user in controller: ${newUser.message}`,
            success: false,
            message: newUser.message,
         });
      }

      return res.json({
         response: `${newUser.data.user_name} with pass ${newUser.data.pwd} `,
         success: newUser.success,
         message: newUser.message,
      });
   };
}
