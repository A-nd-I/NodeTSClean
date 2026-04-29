import { logger } from '#shared/pkg/logger/logger.js';
import express, { Router } from 'express';

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
      this.app.use(express.json());

      this.app.use('/api', this.routes);

      this.app.use('/', () => {
         logger.debug('GET / - Root endpoint');
      });

      this.app.listen(this.port, () => {
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
         logger.info(`Server listening on port: ${this.port}`);
      });
   }
}
