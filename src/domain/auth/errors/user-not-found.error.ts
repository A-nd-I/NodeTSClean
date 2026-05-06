import { DomainBaseError } from './domain-base.error.js';

export class UserNotFoundError extends DomainBaseError {
   constructor(userName: string) {
      super(
         'USER_NOT_FOUND',
         `User with username '${userName}' not found`,
         404,
      );
      this.name = 'UserNotFoundError';
      Object.setPrototypeOf(this, UserNotFoundError.prototype);
   }
}
