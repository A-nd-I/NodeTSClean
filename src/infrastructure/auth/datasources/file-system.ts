import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/entity.js';
import { ResponseType } from '#shared/kernel/types/response.type.js';
import fs from 'node:fs/promises';

export class FileSystemDatasource implements AuthDataSource {
   private url_base = './users';
   private current_file = this.url_base + '/myfile1.txt';

   async saveUser(user: UserEntity): Promise<ResponseType<UserEntity>> {
      try {
         await fs.mkdir(this.url_base, { recursive: true });
         await fs.appendFile(
            this.current_file,
            `${user.user_name}:${user.pwd},\n`,
         );
         return {
            status: true,
            data: user,
         };
      } catch (error: unknown) {
         const err = error instanceof Error ? error.message : 'Unkown error';

         return {
            data: user,
            message: err,
            status: false,
         };
      }
   }
}
