import type { InnerResponseType } from '#shared/kernel/types/response.type.js';

import { logger } from '#shared/pkg/logger/logger.js';

import type { PwdHasherPort } from '../ports/pwd-hasher.js';
import type { AuthRepository } from '../repository/repository.js';

import { UserEntity } from '../entities/entity.js';

export interface SaveUserUseCase {
   execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>>;
}

interface SaveUserOptions {
   authRepository: AuthRepository;
   pwdHasherPort: PwdHasherPort;
}

export class SaveUser implements SaveUserUseCase {
   private readonly authRepository: AuthRepository;
   private readonly pwdHasherPort: PwdHasherPort;

   constructor(options: SaveUserOptions) {
      this.authRepository = options.authRepository;
      this.pwdHasherPort = options.pwdHasherPort;
   }

   public async execute(
      user_name: string,
      pwd: string,
   ): Promise<InnerResponseType<UserEntity>> {
      const cryptedPwd = await this.pwdHasherPort.hash(pwd);
      const user = new UserEntity({
         user_name,
         pwd: cryptedPwd,
      });

      const newUserResponse = await this.authRepository.saveUser(user);
      const newUser = UserEntity.fromObject(newUserResponse.data);

      logger.info({ userName: user_name }, 'User saved successfully');

      return {
         success: true,
         data: newUser,
         message: newUserResponse.message,
      };
   }
}
