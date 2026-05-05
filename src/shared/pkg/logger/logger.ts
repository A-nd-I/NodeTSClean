import type { LoggerOptions } from 'pino';

import pino from 'pino';

import { envs } from '../../config/envs.plugin.js';

const isDevelopment = !envs.PROD;

interface PinoConfig {
   options: LoggerOptions;
   transport: ReturnType<typeof pino.transport> | undefined;
}

const getPinoConfig = (): PinoConfig => {
   if (isDevelopment) {
      return {
         options: { level: 'debug' },
         transport: pino.transport({
            target: 'pino-pretty',
            options: {
               colorize: true,
               singleLine: false,
               translateTime: 'SYS:standard',
               ignore: 'pid,hostname',
            },
         }),
      };
   }

   return {
      options: { level: 'info' },
      transport: undefined,
   };
};

const { options, transport } = getPinoConfig();

export const logger = transport ? pino(options, transport) : pino(options);
