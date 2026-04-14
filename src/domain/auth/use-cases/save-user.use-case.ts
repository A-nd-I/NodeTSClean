import { ResponseType } from "#shared/kernel/types/response.type.js";

import { UserEntity } from "../entities/user.entity.js";
import { AuthRepository } from "../repository/repository.js";


export interface SaveUserUseCase {
    execute( user_name : string, password : string ) : Promise< ResponseType<UserEntity>>
}

type ErrorCallback = ( (error : string) => void ) | undefined;
type SucessCallback = ( () => void ) | undefined;

export class SaveUser implements SaveUserUseCase {

    constructor(
         private readonly authRepository : AuthRepository,
         private readonly successCallback : SucessCallback, 
         private readonly errorCallback : ErrorCallback,
    ){}

    public async  execute ( user_name : string, password : string )
    : Promise <ResponseType <UserEntity>> {

        const user = new UserEntity({
            user_name: user_name,
            password: password
        });
        try {
            const newUserResponse = await this.authRepository.saveUser( user );
            const newUser = UserEntity.fromObject(
                newUserResponse.data
            );
            this.successCallback?.();
            return { 
                status: true, 
                data: newUser 
            };
        } catch (error) { 
            console.error('Error saving user in usecase:', error);
            this.errorCallback?.('Error saving user')
            return Promise.resolve({ 
                status: false,
                data: user 
            });
        }
       
     }
}