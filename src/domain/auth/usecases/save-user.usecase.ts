import { ResponseType } from '#shared/kernel/types/response.type.js';

import { UserEntity } from '../entities/entity.js';
import { PwdHasherPort } from '../ports/pwd-hasher.js';
import { AuthRepository } from '../repository/repository.js';

export interface SaveUserUseCase {
   execute(user_name: string, pwd: string): Promise<ResponseType<UserEntity>>;
}

type ErrorCallback = ((error: string) => void) | undefined;
type SucessCallback = (() => void) | undefined;

export class SaveUser implements SaveUserUseCase {
   constructor(
      private readonly authRepository: AuthRepository,
      private readonly pwdHasherPort: PwdHasherPort,
      private readonly successCallback: SucessCallback,
      private readonly errorCallback: ErrorCallback,
   ) {}

   public async execute(
      user_name: string,
      pwd: string,
   ): Promise<ResponseType<UserEntity>> {
      const cryptedPwd = await this.pwdHasherPort.hash(pwd);
      const user = new UserEntity({
         user_name: user_name,
         pwd: cryptedPwd,
      });
      try {
         const newUserResponse = await this.authRepository.saveUser(user);
         const newUser = UserEntity.fromObject(newUserResponse.data);
         this.successCallback?.();
         return {
            status: true,
            data: newUser,
         };
      } catch (error: unknown) {
         const err =
            error instanceof Error
               ? `${error.name} : ${error.message}`
               : JSON.stringify(error);
         this.errorCallback?.(`Error saving user in usecase: ${err}`);
         return Promise.resolve({
            status: false,
            data: user,
         });
      }
   }
}
