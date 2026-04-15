export interface UserEntityOptions {
    password : string;
    user_name : string;
}

interface UserProp {
    password: string;
    user_name : string;
}

export class UserEntity implements UserEntityOptions {
    
    public user_name : string;
    public password : string;

    constructor( options : UserEntityOptions ){
        this.user_name = options.user_name;
        this.password = options.password;
    }

    static fromObject = ( object: UserProp ): UserEntity => {
        const { user_name, password } = object;
        const user = new UserEntity({
            user_name, password
        });
        return user;
    }
    
}