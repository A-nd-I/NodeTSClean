import { AppRoutes } from "./bootstraping/routes.js";
import { Server } from "./bootstraping/server.js";

function main() {
  const server = new Server({
    port: 3006,
    routes: AppRoutes.routes,
  });
  server.start();
}

main();
