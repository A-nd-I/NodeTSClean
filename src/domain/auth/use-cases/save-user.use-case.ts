import { UserEntity } from "../entities/user.entity.js";
import { AuthRepository } from "../repository/repository.js";


export interface SaveUserUseCase {
    execute( userEntity : UserEntity ) : Promise<UserEntity>
}

export class SaveUser implements SaveUserUseCase {

    constructor(
         private readonly authRepository: AuthRepository
    ){}

    public async  execute ( userEntity : UserEntity ) : Promise<UserEntity> {
        await this.authRepository.saveUser( userEntity );
        return userEntity;
     }
}