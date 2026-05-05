import { DomainBaseError } from './domain-base.error.js';

export class UserAlreadyExistsError extends DomainBaseError {
   constructor(userName: string) {
      super(
         'USER_ALREADY_EXISTS',
         `User with username '${userName}' already exists`,
         409,
      );
      this.name = 'UserAlreadyExistsError';
      Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
   }
}
