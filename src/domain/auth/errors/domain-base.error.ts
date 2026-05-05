export class DomainBaseError extends Error {
   constructor(
      public code: string,
      message: string,
      // eslint-disable-next-line @typescript-eslint/no-inferrable-types
      public statusCode: number = 404,
   ) {
      super(message);
      this.name = 'DomainBaseError';
      Object.setPrototypeOf(this, DomainBaseError.prototype);
   }
}
