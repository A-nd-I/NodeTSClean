import { InnerResponseType } from '../../../shared/kernel/types/response.type.js';
import { UserEntity } from '../entities/entity.js';

export abstract class AuthDataSource {
   abstract saveUser(user: UserEntity): Promise<InnerResponseType<UserEntity>>;
   abstract loginUser(user: UserEntity): Promise<InnerResponseType<UserEntity>>;
}
