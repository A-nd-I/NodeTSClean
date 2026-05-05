import type { InnerResponseType } from '#shared/kernel/types/response.type.js';

import { logger } from '#shared/pkg/logger/logger.js';

import type { PwdHasherPort } from '../ports/pwd-hasher.js';
import type { AuthRepository } from '../repository/repository.js';

import { UserEntity } from '../entities/entity.js';

export interface LoginUserUseCase {
   execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>>;
}

interface LoginUserOptions {
   authRepository: AuthRepository;
   pwdHasherPort: PwdHasherPort;
}

export class LoginUser implements LoginUserUseCase {
   private readonly authRepository: AuthRepository;
   private readonly pwdHasherPort: PwdHasherPort;

   constructor(options: LoginUserOptions) {
      this.authRepository = options.authRepository;
      this.pwdHasherPort = options.pwdHasherPort;
   }

   public async execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>> {
      const user = new UserEntity({
         user_name,
         pwd,
      });

      const signedUser = await this.authRepository.loginUser(user);

      const isPasswordValid = await this.pwdHasherPort.compare(
         user.pwd,
         signedUser.data.pwd,
      );

      if (!isPasswordValid) {
         throw new Error('Password is not valid');
      }

      logger.info({ userName: user_name }, 'User logged in successfully');

      return {
         success: true,
         data: signedUser.data,
         message: signedUser.message,
      };
   }
}
