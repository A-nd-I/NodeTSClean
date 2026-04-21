import { describe, expect, test } from '@jest/globals';

import { PwdHasherPort } from './pwd-hasher.js';

describe('PwdHasherPort', () => {
   class MockPwdHasherPort implements PwdHasherPort {
      hash(pwd: string): Promise<string> {
         return Promise.resolve('hashedpwd of ' + pwd);
      }
      compare(pwd: string, hash: string): Promise<boolean> {
         return Promise.resolve(hash === 'hashedpwd of ' + pwd);
      }
   }

   test('should be called hash and compare', async () => {
      const mockPwdHasherPort = new MockPwdHasherPort();
      const response = await mockPwdHasherPort.hash('pwd123');
      expect(response).toBe('hashedpwd of pwd123');
   });

   test('should be called compare', async () => {
      const mockPwdHasherPort = new MockPwdHasherPort();
      const response = await mockPwdHasherPort.compare(
         'pwd123',
         'hashedpwd of pwd123',
      );
      expect(response).toBeTruthy();
   });
});
