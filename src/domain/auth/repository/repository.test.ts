import { ResponseType } from '#shared/kernel/types/response.type.js';
import { describe, expect, test } from '@jest/globals';

import { UserEntity } from '../entities/entity.js';
import { AuthRepository } from './repository.js';

const newUser = new UserEntity({
   user_name: 'test@example.com',
   pwd: 'test-pwd',
});

describe('AuthRepository', () => {
   class MockAuthRepository implements AuthRepository {
      saveUser(user: UserEntity): Promise<ResponseType<UserEntity>> {
         return Promise.resolve({
            success: true,
            data: user,
         });
      }
   }

   test('should be called saveUser', async () => {
      const mockAuthRepository = new MockAuthRepository();
      const response = await mockAuthRepository.saveUser(newUser);

      expect(response).toEqual({
         success: true,
         data: newUser,
      });
   });
});
