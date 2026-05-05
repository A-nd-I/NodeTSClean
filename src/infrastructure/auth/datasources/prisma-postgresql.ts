import type { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import type { InnerResponseType } from '#shared/kernel/types/response.type.js';

import { UserEntity } from '#domain/auth/entities/entity.js';
import { mapPrismaErrorToDomainError } from '#infrastructure/auth/mappers/index.js';

import { prisma } from '../../persistence/prisma.js';

export class PrimaPostgresqlDatasource implements AuthDataSource {
   async loginUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
      try {
         const foundUser = await prisma.user.findUnique({
            where: {
               user_name: user.user_name,
            },
         });

         if (!foundUser) {
            throw new Error('User not found');
         }

         return {
            success: true,
            data: foundUser,
            message: 'User found successfully',
         };
      } catch (error: unknown) {
         mapPrismaErrorToDomainError(error, 'loginUser');
         throw error;
      }
   }

   async saveUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
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
         mapPrismaErrorToDomainError(error, 'saveUser');
         throw error;
      }
   }
}
