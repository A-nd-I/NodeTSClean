import { Server } from './bootstrap/server.js';
import { AppRoutes } from './presentation/routes.js';
import { envs } from './shared/config/envs.plugin.js';

function main() {
   const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
   });
   server.start();
}

main();
