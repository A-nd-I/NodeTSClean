import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/entity.js';
import { InnerResponseType } from '#shared/kernel/types/response.type.js';

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
            return {
               data: user,
               message: 'User not found',
               success: false,
            };
         }

         return {
            success: true,
            data: foundUser,
            message: 'User found successfully',
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
         const err = error instanceof Error ? error.message : 'Unkown error';

         return {
            data: user,
            message: 'Error saving user in datasource with error: ' + err,
            success: false,
         };
      }
   }
}
