import { Router } from "express";
import { Request, Response } from "express";

import fs from "node:fs";

export class AuthRoutes {
    static get routes() {
        const router = Router();

        router.use('/register-user', (req : Request, res : Response)=>{
            const body = req.body as { user_name?: string; password?: string };
            const { user_name , password } = body;
            console.log(user_name, password);

            fs.writeFileSync("./data-temp/myfile2.txt", `${ user_name } with pass ${ password } `)

            res.json({"status":200});
        });
        
        router.use('/sign-in', ()=>{});

        return router;
    }
}