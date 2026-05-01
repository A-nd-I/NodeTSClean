import { AuthDataSource } from '#domain/auth/datasources/datasource.js';
import { UserEntity } from '#domain/auth/entities/entity.js';
import { InnerResponseType } from '#shared/kernel/types/response.type.js';
import { existsSync } from 'node:fs';
import fs, { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export class FileSystemDatasource implements AuthDataSource {
   private url_base = './users';
   private current_file = this.url_base + '/myfile1.txt';

   loginUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
      return Promise.resolve({
         success: false,
         data: user,
         message: 'Method not implemented.',
      });
   }

   async saveUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
      try {
         await fs.mkdir(this.url_base, { recursive: true });
         if (!existsSync(this.current_file)) {
            await fs.appendFile(
               this.current_file,
               `${user.user_name}:${user.pwd},\n`,
            );
         }

         const filePath = resolve(this.current_file);
         const content = await readFile(filePath, 'utf-8');
         const lines = content.split('\n').filter((line) => line.trim() !== '');

         const exists = lines.some((record) => {
            const colonIndex = record.indexOf(':');
            if (colonIndex === -1) return false;

            const storedUser = record.slice(0, colonIndex);
            if (storedUser === user.user_name) {
               return true;
            } else {
               return false;
            }
         });

         if (!exists) {
            await fs.appendFile(
               this.current_file,
               `${user.user_name}:${user.pwd},\n`,
            );
            return {
               success: true,
               data: user,
               message: 'User saved successfully in file system',
            };
         }
         return {
            success: false,
            data: user,
            message: 'User already exists in file system',
         };
      } catch (error: unknown) {
         const err = error instanceof Error ? error.message : 'Unkown error';

         return {
            data: user,
            message: err,
            success: false,
         };
      }
   }
}
