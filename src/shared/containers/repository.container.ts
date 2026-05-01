import type { PwdHasherPort } from '#domain/auth/ports/pwd-hasher.js';
import type { AuthRepository } from '#domain/auth/repository/repository.js';

import {
   createAuthRepository,
   createPwdHasher,
} from '#shared/config/repositories.config.js';

export class RepositoryContainer {
   private authRepository?: AuthRepository;
   private pwdHasher?: PwdHasherPort;

   getAuthRepository(): AuthRepository {
      this.authRepository ??= createAuthRepository();
      return this.authRepository;
   }

   getPwdHasher(): PwdHasherPort {
      this.pwdHasher ??= createPwdHasher();
      return this.pwdHasher;
   }
}
