import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/user.entity.js';
import { AuthRepository } from '#domain/auth/repository/repository.js';
import { ResponseType } from '#shared/kernel/types/response.type.js';

export class AuthRepositoryImpl implements AuthRepository {
   constructor(private readonly authDatasource: AuthDataSource) {}

   async saveUser(user: UserEntity): Promise<ResponseType<UserEntity>> {
      return this.authDatasource.saveUser(user);
   }
}
