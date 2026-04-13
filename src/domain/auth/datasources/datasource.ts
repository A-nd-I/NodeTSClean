import { UserEntity } from "../entities/user.entity.js";

export abstract class AuthDataSource {
  abstract saveUser( user : UserEntity ): Promise<void>;
}
