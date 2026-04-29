import { SaveUser } from '#domain/auth/usecases/save-user.usecase.js';
import { FileSystemDatasource } from '#infrastructure/auth/datasources/file-system.js';
// import { PrimaPostgresqlDatasource } from '#infrastructure/auth/datasources/prisma-postgresql.js';
import { BcryptPwdHasher } from '#infrastructure/auth/ports/bcrypt-pwd-hasher.js';
import { AuthRepositoryImpl } from '#infrastructure/auth/repositories/repository.impl.js';
import { logger } from '#shared/pkg/logger/logger.js';
import { Request, Response } from 'express';

const fsAuthRepository = new AuthRepositoryImpl(new FileSystemDatasource());
// const pgAuthRepository = new AuthRepositoryImpl(
//    new PrimaPostgresqlDatasource(),
// );

const bcryptPwdHasher = new BcryptPwdHasher();

export class AuthController {
   public saveUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const newUser = await new SaveUser({
         authRepository: fsAuthRepository,
         errorCallback: (error) => {
            logger.error('error: ' + error);
         },
         pwdHasherPort: bcryptPwdHasher,
         successCallback: () => {
            logger.info('success');
         },
      }).execute(user_name, pwd);

      return res.json({
         response: `${newUser.data.user_name} with pass ${newUser.data.pwd} `,
         success: newUser.success,
         message: newUser.message,
      });
   };
}
