import { Router } from "express";

import { TodoRoutes } from "./todo/routes.js";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/presentation", () => {
      console.log("in presentation routes");
    });

    router.use("/todo", TodoRoutes.routes);

    return router;
  }
}
