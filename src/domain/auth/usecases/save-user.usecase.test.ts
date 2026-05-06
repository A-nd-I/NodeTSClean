import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import { UserEntity } from '../entities/entity.js';
import { SaveUser } from './save-user.usecase.js';

const newUser = new UserEntity({
   user_name: 'test@example.com',
   pwd: 'test-pwd',
});

describe('SaveUserService', () => {
   const mockRepository = {
      loginUser: jest.fn((user: UserEntity) =>
         Promise.resolve({
            success: true,
            data: user,
            message: 'User logged in successfully',
         }),
      ),
      saveUser: jest.fn((user: UserEntity) =>
         Promise.resolve({
            success: true,
            data: user,
            message: 'User saved successfully',
         }),
      ),
   };

   const mockPwdHasherPort = {
      hash: jest.fn((pwd: string) => Promise.resolve('hashedpwd of ' + pwd)),
      compare: jest.fn((pwd: string, hash: string) =>
         Promise.resolve(hash === 'hashedpwd of ' + pwd),
      ),
   };

   const authService = new SaveUser({
      authRepository: mockRepository,
      pwdHasherPort: mockPwdHasherPort,
   });

   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('should call save user with hashed pwd', async () => {
      await authService.execute(newUser.user_name, newUser.pwd);
      const expectedPwd = await mockPwdHasherPort.hash(newUser.pwd);
      expect(mockRepository.saveUser).toHaveBeenCalledWith(
         expect.objectContaining({
            user_name: newUser.user_name,
            pwd: expectedPwd,
         }),
      );
   });
});
