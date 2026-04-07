import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

function main() {
  const server = new Server({
    port: 3006,
    routes: AppRoutes.routes,
  });
  server.start();
}

main();
