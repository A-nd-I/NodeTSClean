import { DomainBaseError } from './domain-base.error.js';

export class UserAlreadyExistsError extends DomainBaseError {
   constructor() {
      super('USER_ALREADY_EXISTS', 'User already exists', 409);
      this.name = 'UserAlreadyExistsError';
      Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
   }
}
