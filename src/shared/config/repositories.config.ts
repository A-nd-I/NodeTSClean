import type { PwdHasherPort } from '#domain/auth/ports/pwd-hasher.js';
import type { AuthRepository } from '#domain/auth/repository/repository.js';

import { PrimaPostgresqlDatasource } from '#infrastructure/auth/datasources/prisma-postgresql.js';
import { BcryptPwdHasher } from '#infrastructure/auth/ports/bcrypt-pwd-hasher.js';
import { AuthRepositoryImpl } from '#infrastructure/auth/repositories/repository.impl.js';

/**
 * Centralized configuration for repository and hasher dependencies.
 * To change database implementation, replace PrimaPostgresqlDatasource with the new datasource.
 * Example: For MongoDB, import MongoDbDatasource and pass to AuthRepositoryImpl constructor.
 */

export const createAuthRepository = (): AuthRepository => {
   return new AuthRepositoryImpl(new PrimaPostgresqlDatasource());
};

export const createPwdHasher = (): PwdHasherPort => {
   return new BcryptPwdHasher();
};
