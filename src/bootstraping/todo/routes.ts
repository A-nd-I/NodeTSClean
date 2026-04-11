import { Router } from "express";

export class TodoRoutes {
  static get routes() {
    const router = Router();

    router.use("/getAll", () => {
      console.log("getting all todos");
    });

    return router;
  }
}
