import { SaveUser } from '#domain/auth/usecases/save-user.usecase.js';
import { FileSystemDatasource } from '#infrastructure/datasources/file-system.datasource.js';
import { AuthRepositoryImpl } from '#infrastructure/repositories/repository.impl.js';
import { Request, Response } from 'express';

const fsAuthRepository = new AuthRepositoryImpl(new FileSystemDatasource());

export class AuthController {
   public saveUser = async (req: Request, res: Response) => {
      const body = req.body as {
         pwd: string;
         user_name: string;
      };
      const { pwd, user_name } = body;

      const newUser = await new SaveUser(
         fsAuthRepository,
         () => {
            console.log('success');
         },
         (error) => {
            console.log('error' + error);
         },
      ).execute(pwd, user_name);

      return res.json({
         response: `${newUser.data.user_name} with pass ${newUser.data.pwd} `,
         status: newUser.status,
      });
   };
}
