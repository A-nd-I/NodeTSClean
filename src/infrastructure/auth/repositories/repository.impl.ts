import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/entity.js';
import { AuthRepository } from '#domain/auth/repository/repository.js';
import { InnerResponseType } from '#shared/kernel/types/response.type.js';

export class AuthRepositoryImpl implements AuthRepository {
   constructor(private readonly authDatasource: AuthDataSource) {}

   async saveUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
      return this.authDatasource.saveUser(user);
   }

   async loginUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
      return this.authDatasource.loginUser(user);
   }
}
