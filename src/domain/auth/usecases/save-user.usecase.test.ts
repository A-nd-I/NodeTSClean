import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import { UserEntity } from '../entities/entity.js';
import { SaveUser } from './save-user.usecase.js';

const newUser = new UserEntity({
   user_name: 'test@example.com',
   pwd: 'test-pwd',
});

describe('SaveUserService', () => {
   const mockRepository = {
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

   const errorCallback = jest.fn();
   const sucessCallback = jest.fn();

   const authService = new SaveUser({
      authRepository: mockRepository,
      errorCallback,
      pwdHasherPort: mockPwdHasherPort,
      successCallback: sucessCallback,
   });

   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('should call successCallback when user is saved successfully', async () => {
      await authService.execute(newUser.user_name, newUser.pwd);
      expect(mockRepository.saveUser).toHaveBeenCalled();
      expect(sucessCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
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

   test('should call errorCallback when repository throws an error', async () => {
      mockRepository.saveUser.mockImplementationOnce(() =>
         Promise.reject(new Error('Error saving user')),
      );
      await authService.execute(newUser.user_name, newUser.pwd);
      expect(errorCallback).toHaveBeenCalled();
   });
});
