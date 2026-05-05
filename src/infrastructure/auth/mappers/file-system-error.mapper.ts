import {
   UserAlreadyExistsError,
   UserNotFoundError,
} from '#domain/auth/errors/index.js';
import { logger } from '#shared/pkg/logger/logger.js';

interface FileSystemErrorType {
   code?: string;
   message: string;
   path?: string;
}

const ensureFileSystemError = (error: unknown): FileSystemErrorType => {
   if (error && typeof error === 'object' && 'message' in error) {
      return error as FileSystemErrorType;
   }
   return { code: undefined, message: 'Unknown error' };
};

export const mapFileSystemErrorToDomainError = (
   error: unknown,
   context: string,
): void => {
   const fsError = ensureFileSystemError(error);

   logger.error(
      {
         errorCode: fsError.code,
         message: fsError.message,
         path: fsError.path,
         context,
      },
      'FileSystem error occurred',
   );

   if (!fsError.code) {
      throw new Error(`FileSystem error: ${fsError.message}`);
   }

   if (fsError.code === 'ENOENT') {
      throw new UserNotFoundError('user');
   }

   if (fsError.message.includes('User already exists')) {
      throw new UserAlreadyExistsError('user');
   }

   if (fsError.code === 'EACCES') {
      if (fsError.path) {
         throw new Error(`Permission denied: ${fsError.path}`);
      }
      throw new Error('Permission denied');
   }

   throw new Error(
      `Unhandled FileSystem error: ${fsError.code} - ${fsError.message}`,
   );
};
