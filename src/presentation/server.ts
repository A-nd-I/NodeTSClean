import express, { Router } from "express";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port, routes } = options;
    this.routes = routes;
    this.port = port;
  }

  start() {
    this.app.use("/newRouter", this.routes);
    this.app.use("/", () => {
      console.log("hi from here /");
    });
    this.app.listen(this.port, () => {
      console.log("Server listening on: ", this.port);
    });
  }
}
