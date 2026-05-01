import { InnerResponseType } from '#shared/kernel/types/response.type.js';
import { describe, expect, test } from '@jest/globals';

import { UserEntity } from '../entities/entity.js';
import { AuthRepository } from './repository.js';

const newUser = new UserEntity({
   user_name: 'test@example.com',
   pwd: 'test-pwd',
});

describe('AuthRepository', () => {
   class MockAuthRepository implements AuthRepository {
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
      const mockAuthRepository = new MockAuthRepository();
      const response = await mockAuthRepository.saveUser(newUser);

      expect(response).toEqual({
         success: true,
         data: newUser,
         message: 'User saved successfully',
      });
   });
});
