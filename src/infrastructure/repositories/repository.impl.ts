import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/user.entity.js';
import { AuthRepository } from '#domain/auth/repository/repository.js';


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDataSource,
  ) {}

  async saveUser( user: UserEntity ): Promise<void> {
    return this.authDatasource.saveUser( user );
  }

}
