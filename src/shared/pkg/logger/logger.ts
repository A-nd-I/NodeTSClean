import type { LoggerOptions } from 'pino';

import { mkdirSync } from 'node:fs';
import pino from 'pino';

import { envs } from '../../config/envs.plugin.js';

const isDevelopment = !envs.PROD;

const ensureLogsDir = () => {
   const logsDir = './logs';
   try {
      mkdirSync(logsDir, { recursive: true });
   } catch (error) {
      if (
         error instanceof Error &&
         'code' in error &&
         error.code !== 'EEXIST'
      ) {
         console.error(`Failed to create logs directory: ${error.message}`);
      }
   }
};

const getLogFilePath = (): string => {
   const logsDir = './logs';
   const fileName = isDevelopment ? 'app.dev.log' : 'app.prod.log';
   return `${logsDir}/${fileName}`;
};

interface PinoConfig {
   options: LoggerOptions;
   transport: ReturnType<typeof pino.transport> | undefined;
}

const getPinoConfig = (): PinoConfig => {
   const logFilePath = getLogFilePath();

   if (isDevelopment) {
      return {
         options: { level: 'debug' },
         transport: pino.transport({
            targets: [
               {
                  target: 'pino-pretty',
                  options: {
                     colorize: true,
                     singleLine: false,
                     translateTime: 'SYS:standard',
                     ignore: 'pid,hostname',
                  },
               },
               {
                  level: 'error',
                  target: 'pino-pretty',
                  options: {
                     colorize: false,
                     singleLine: false,
                     translateTime: 'SYS:standard',
                     ignore: 'pid,hostname',
                     destination: logFilePath,
                  },
               },
            ],
         }),
      };
   }

   return {
      options: { level: 'info' },
      transport: pino.transport({
         level: 'error',
         target: 'pino-pretty',
         options: {
            colorize: false,
            singleLine: false,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            destination: logFilePath,
         },
      }),
   };
};

const { options, transport } = getPinoConfig();

ensureLogsDir();

export const logger = transport ? pino(options, transport) : pino(options);
