import { AuthDataSource } from "#domain/auth/datasources/datasource.js";
import { UserEntity } from "#domain/auth/entities/user.entity.js";
import { ResponseType } from "#shared/kernel/types/response.type.js";
import fs from "node:fs"

export class FileSystemDatasource implements AuthDataSource {

    saveUser( user: UserEntity ): Promise< ResponseType<UserEntity>> {
        
        const url_base = './data-tmp';
        const current_file = url_base + "/myfile1.txt";
        
        if (!fs.existsSync(url_base)) {
                fs.mkdirSync(url_base)
        };

        fs.writeFileSync(
            current_file, 
            `${ user.user_name} with pass ${ user.password } `
        );

        return Promise.resolve( { status: true, data: user } );
        
    }    
}