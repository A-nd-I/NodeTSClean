import { Router } from "express";

import { AuthRoutes } from "./auth/routes.js";
import { TodoRoutes } from "./todo/routes.js";


export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    

    router.use("/todo", TodoRoutes.routes);

    router.use("/auth", AuthRoutes.routes);

    return router;
  }
}
