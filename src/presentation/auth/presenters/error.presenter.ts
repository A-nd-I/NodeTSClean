import type { OuterResponseType } from '#shared/kernel/types/response.type.js';

import { DomainBaseError } from '#domain/auth/errors/index.js';

export const errorPresenter = (error: unknown): OuterResponseType => {
   if (error instanceof DomainBaseError) {
      return {
         response: error.message,
         success: false,
         code: error.code,
         statusCode: error.statusCode,
      };
   }

   if (error instanceof Error) {
      return {
         response: error.message,
         success: false,
         code: 'INTERNAL_ERROR',
         statusCode: 500,
      };
   }

   return {
      response: 'Internal Server Error',
      success: false,
      code: 'INTERNAL_ERROR',
      statusCode: 500,
   };
};
