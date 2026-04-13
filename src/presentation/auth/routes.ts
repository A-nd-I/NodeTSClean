import { AuthController } from "#presentation/auth/controller.js";
import { Router } from "express";


export class AuthRoutes {
    static get routes() {
        const router = Router();

        router.use('/register-user', new AuthController().saveUser);
        
        //router.use('/sign-in', ()=>{});

        return router;
    }
}