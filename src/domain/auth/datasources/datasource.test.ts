import { InnerResponseType } from '#shared/kernel/types/response.type.js';
import { describe, expect, test } from '@jest/globals';

import { UserEntity } from '../entities/entity.js';
import { AuthDataSource } from './datasource.js';

const newUser = new UserEntity({
   user_name: 'test@example.com',
   pwd: 'test-pwd',
});

describe('AuthDataSource', () => {
   class MockAuthDatasource implements AuthDataSource {
      loginUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
         return Promise.resolve({
            success: true,
            data: user,
            message: 'User logged in successfully',
         });
      }

      saveUser(user: UserEntity): Promise<InnerResponseType<UserEntity>> {
         return Promise.resolve({
            success: true,
            data: user,
            message: 'User saved successfully',
         });
      }
   }

   test('should be called saveUser', async () => {
      const mockDatasource = new MockAuthDatasource();
      const response = await mockDatasource.saveUser(newUser);

      expect(response).toEqual({
         success: true,
         data: newUser,
         message: 'User saved successfully',
      });
   });
});
