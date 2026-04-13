import { UserEntity } from "../entities/user.entity.js";

export abstract class AuthRepository {
  abstract saveUser( user : UserEntity ): Promise<void>;
}



