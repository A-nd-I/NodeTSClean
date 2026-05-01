import { describe, expect, test } from '@jest/globals';
import express from 'express';

import { Server } from './server.js';

interface ServerInternals {
   app: express.Application;
   port: number;
}

describe('Server', () => {
   test('should assign port and routes correctly from ServerOptions', () => {
      const routeFactory = () => {
         const router = express.Router();
         return router;
      };

      const server = new Server({ port: 3001, routes: routeFactory });
      const internalServer = server as unknown as ServerInternals;

      expect(internalServer.app).toBeDefined();
      expect(internalServer.app).toBeInstanceOf(Function);
      expect(internalServer.app.use).toBe(express.application.use);
      expect(internalServer.app.listen).toBe(express.application.listen);
   });
});
