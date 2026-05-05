import type { InnerResponseType } from '#shared/kernel/types/response.type.js';
import type { OuterResponseType } from '#shared/kernel/types/response.type.js';

export const successPresenter = <T>(
   data: InnerResponseType<T>,
): OuterResponseType => {
   return {
      response: data.message,
      success: true,
   };
};
