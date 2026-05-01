import type { InnerResponseType } from '#shared/kernel/types/response.type.js';

import type { PwdHasherPort } from '../ports/pwd-hasher.js';
import type { AuthRepository } from '../repository/repository.js';

import { UserEntity } from '../entities/entity.js';

export interface LoginUserUseCase {
   execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>>;
}

type ErrorCallback = ((error: string) => void) | undefined;

interface LoginUserOptions {
   authRepository: AuthRepository;
   errorCallback: ErrorCallback;
   pwdHasherPort: PwdHasherPort;
   successCallback: SuccessCallback;
}

type SuccessCallback = (() => void) | undefined;

export class LoginUser implements LoginUserUseCase {
   private readonly authRepository: AuthRepository;
   private readonly errorCallback: ErrorCallback;
   private readonly pwdHasherPort: PwdHasherPort;
   private readonly successCallback: SuccessCallback;

   constructor(options: LoginUserOptions) {
      this.authRepository = options.authRepository;
      this.errorCallback = options.errorCallback;
      this.pwdHasherPort = options.pwdHasherPort;
      this.successCallback = options.successCallback;
   }

   public async execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>> {
      const user = new UserEntity({
         user_name,
         pwd,
      });
      const authenticationError = 'Error in login user in usecase';
      try {
         const signedUser = await this.authRepository.loginUser(user);

         if (!signedUser.success) {
            this.errorCallback?.(JSON.stringify(signedUser.message));
            return {
               success: false,
               data: user,
               message: signedUser.message,
            };
         }

         const isPasswordValid = await this.pwdHasherPort.compare(
            user.pwd,
            signedUser.data.pwd,
         );
         if (!isPasswordValid) {
            this.errorCallback?.(JSON.stringify(signedUser.message));
            return {
               success: false,
               data: user,
               message: signedUser.message + ' and password is not valid',
            };
         }
         this.successCallback?.();
         return {
            success: true,
            data: signedUser.data,
            message: signedUser.message + ' and password is valid',
         };
      } catch (error: unknown) {
         const err =
            error instanceof Error
               ? `${error.name} : ${error.message}`
               : JSON.stringify(error);
         this.errorCallback?.(authenticationError);
         return {
            success: false,
            data: user,
            message: err,
         };
      }
   }
}
