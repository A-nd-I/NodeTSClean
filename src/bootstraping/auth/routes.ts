import { Router } from "express";
import { Request, Response } from "express";

import fs from "node:fs";

export class AuthRoutes {
    static get routes() {
        const router = Router();

        const url_base = './data-tmp';

        router.use('/register-user', (req : Request, res : Response)=>{
            const body = req.body as { user_name?: string; password?: string };
            const { user_name , password } = body;
            console.log(user_name, password);

            if ( !fs.existsSync(`${ url_base }`) ) { 
                fs.mkdir(`${ url_base }`, () => {
                    fs.writeFileSync(url_base + "/myfile2.txt", `${ user_name } with pass ${ password } `)
                })
            };        
            res.json({ "response" : `${ user_name } with pass ${ password } ` });
        });
        
        router.use('/sign-in', ()=>{});

        return router;
    }
}