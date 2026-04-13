import { UserEntity } from "#domain/auth/entities/user.entity.js";
import { SaveUser } from "#domain/auth/use-cases/save-user.use-case.js";
import { FileSystemDatasource } from "#infrastructure/datasources/file-system.datasource.js";
import { AuthRepositoryImpl } from "#infrastructure/repositories/repository.impl.js";
import { Request, Response } from "express";

const fsAuthRepository = new AuthRepositoryImpl(
  new FileSystemDatasource()
);

export class AuthController {

  public saveUser = async (req: Request, res: Response) => {
    const body = req.body as { password: string, user_name: string };
    const { password, user_name } = body;
    
    const user = new UserEntity({
      user_name: user_name,
      password: password
    });

    await new SaveUser( fsAuthRepository ).execute( user );
    res.json({ response: `${ user.user_name } with pass ${ user.password } ` });   
    return true;
  };
}
