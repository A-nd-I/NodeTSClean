import {
   UserAlreadyExistsError,
   UserNotFoundError,
} from '#domain/auth/errors/index.js';
import { logger } from '#shared/pkg/logger/logger.js';

interface PrismaErrorType {
   code?: string;
   message: string;
   meta?: { target?: string[] };
}

const ensurePrismaError = (error: unknown): PrismaErrorType => {
   if (error && typeof error === 'object' && 'message' in error) {
      return error as PrismaErrorType;
   }
   return { code: undefined, message: 'Unknown error' };
};

export const mapPrismaErrorToDomainError = (
   error: unknown,
   context: string,
): void => {
   const prismaError = ensurePrismaError(error);

   logger.error(
      {
         prismaCode: prismaError.code,
         message: prismaError.message,
         context,
      },
      'Prisma error occurred',
   );

   if (!prismaError.code) {
      throw new Error(`Prisma error: ${prismaError.message}`);
   }

   if (prismaError.code === 'P2002') {
      const username = prismaError.meta?.target?.[0] ?? 'unknown';
      throw new UserAlreadyExistsError(username);
   }

   if (prismaError.code === 'P2025') {
      throw new UserNotFoundError('user');
   }

   throw new Error(
      `Unhandled Prisma error: ${prismaError.code} - ${prismaError.message}`,
   );
};
