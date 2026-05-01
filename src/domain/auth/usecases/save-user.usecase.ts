import { InnerResponseType } from '#shared/kernel/types/response.type.js';

import { UserEntity } from '../entities/entity.js';
import { PwdHasherPort } from '../ports/pwd-hasher.js';
import { AuthRepository } from '../repository/repository.js';

export interface SaveUserUseCase {
   execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>>;
}

type ErrorCallback = ((error: string) => void) | undefined;

interface SaveUserOptions {
   authRepository: AuthRepository;
   errorCallback: ErrorCallback;
   pwdHasherPort: PwdHasherPort;
   successCallback: SuccessCallback;
}

type SuccessCallback = (() => void) | undefined;

export class SaveUser implements SaveUserUseCase {
   private readonly authRepository: AuthRepository;
   private readonly errorCallback: ErrorCallback;
   private readonly pwdHasherPort: PwdHasherPort;
   private readonly successCallback: SuccessCallback;

   constructor(options: SaveUserOptions) {
      this.authRepository = options.authRepository;
      this.errorCallback = options.errorCallback;
      this.pwdHasherPort = options.pwdHasherPort;
      this.successCallback = options.successCallback;
   }

   public async execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>> {
      const cryptedPwd = await this.pwdHasherPort.hash(pwd);
      const user = new UserEntity({
         user_name: user_name,
         pwd: cryptedPwd,
      });
      try {
         const newUserResponse = await this.authRepository.saveUser(user);
         if (!newUserResponse.success) {
            this.errorCallback?.(JSON.stringify(newUserResponse.message));

            const errorResponse = {
               success: false,
               data: user,
               message:
                  'Error saving user in usecase - response from datasource: ' +
                  newUserResponse.message,
            };

            return errorResponse;
         }

         const newUser = UserEntity.fromObject(newUserResponse.data);
         this.successCallback?.();
         return {
            success: true,
            data: newUser,
            message: newUserResponse.message,
         };
      } catch (error: unknown) {
         const err =
            error instanceof Error
               ? `${error.name} : ${error.message}`
               : JSON.stringify(error);
         this.errorCallback?.(
            'Error saving user in usecase with error: ' + err,
         );
         return {
            success: false,
            data: user,
            message: err,
         };
      }
   }
}
