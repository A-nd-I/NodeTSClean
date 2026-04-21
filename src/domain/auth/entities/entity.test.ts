import { describe, expect, test } from '@jest/globals';

import { UserEntity } from './entity.js';

const user = {
   user_name: 'testuser',
   pwd: 'pwd123',
};

describe('UserEntity', () => {
   test('should create an instance of UserEntity', () => {
      const newUser = new UserEntity(user);
      expect(newUser).toBeInstanceOf(UserEntity);
   });

   test('should create a UserEntity with the correct properties', () => {
      const newUser = new UserEntity(user);
      expect(newUser.user_name).toBe(user.user_name);
      expect(newUser.pwd).toBe(user.pwd);
   });

   test('should create a UserEntity instance from json string', () => {
      const json = `{"user_name": "${user.user_name}", "pwd": "${user.pwd}"}`;
      const userEntity = UserEntity.fromJson(json);
      expect(userEntity).toBeInstanceOf(UserEntity);
   });

   test('should create a UserEntity instance from object', () => {
      const object = { user_name: user.user_name, pwd: user.pwd };
      const userEntity = UserEntity.fromObject(object);
      expect(userEntity).toBeInstanceOf(UserEntity);
   });
});
