import { Server } from "./bootstrap/server.js";
import { AppRoutes } from "./presentation/routes.js";

function main() {
  const server = new Server({
    port: 3006,
    routes: AppRoutes.routes,
  });
  server.start();
}

main();
