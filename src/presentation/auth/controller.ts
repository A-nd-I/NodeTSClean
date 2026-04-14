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

    const newUser = await new SaveUser( 
      fsAuthRepository,
      () => { 
        console.log("success");
      },
      (error) => { console.log("error" + error)} 
    ).execute( password, user_name );

    return res.json({ 
      response: `${ newUser.data.user_name } with pass ${ newUser.data.password } `, 
      status: newUser.status
    });
  };
}
