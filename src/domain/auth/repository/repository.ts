import { ResponseType } from "#shared/kernel/types/response.type.js";

import { UserEntity } from "../entities/user.entity.js";

export abstract class AuthRepository {
  abstract saveUser( user : UserEntity ): Promise< ResponseType<UserEntity>>;
}



