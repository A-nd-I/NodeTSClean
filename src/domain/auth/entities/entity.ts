export interface UserEntityOptions {
   pwd: string;
   user_name: string;
}

export class UserEntity implements UserEntityOptions {
   public user_name: string;
   public pwd: string;

   constructor(options: UserEntityOptions) {
      this.user_name = options.user_name;
      this.pwd = options.pwd;
   }

   static fromObject = (object: UserEntityOptions): UserEntity => {
      const { user_name, pwd } = object;
      const user = new UserEntity({
         user_name,
         pwd,
      });
      return user;
   };

   static fromJson = (json: string): UserEntity => {
      if (!json && json === '') {
         throw Error('Error parsing json string to UserEntity');
      }

      const data = JSON.parse(json) as Record<string, string>;
      const { user_name, pwd } = data;

      const user = new UserEntity({
         user_name,
         pwd,
      });
      return user;
   };
}
