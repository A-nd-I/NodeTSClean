import { RepositoryContainer } from '#shared/containers/repository.container.js';
import { logger } from '#shared/pkg/logger/logger.js';
import express, { Router } from 'express';

interface ServerOptions {
   port: number;
   routes: (container: RepositoryContainer) => Router;
}

export class Server {
   private app = express();
   private readonly port: number;
   private readonly routeFactory: (container: RepositoryContainer) => Router;

   constructor(options: ServerOptions) {
      const { port, routes } = options;
      this.routeFactory = routes;
      this.port = port;
   }

   start() {
      this.app.use(express.json());

      const container = new RepositoryContainer();
      const routes = this.routeFactory(container);

      this.app.use('/api', routes);

      this.app.use('/', () => {
         logger.debug('GET / - Root endpoint');
      });

      this.app.listen(this.port, () => {
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
         logger.info(`Server listening on port: ${this.port}`);
      });
   }
}
