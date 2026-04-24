import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/entity.js';
import { ResponseType } from '#shared/kernel/types/response.type.js';

import { prisma } from '../../persistence/prisma.js';

export class PrimaPostgresqlDatasource implements AuthDataSource {
   async saveUser(user: UserEntity): Promise<ResponseType<UserEntity>> {
      try {
         const newUser = await prisma.user.create({
            data: user,
         });

         return {
            success: true,
            data: newUser,
            message: 'User saved successfully',
         };
      } catch (error: unknown) {
         const err = error instanceof Error ? error.message : 'Unkown error';

         return {
            data: user,
            message: err,
            success: false,
         };
      }
   }
}
