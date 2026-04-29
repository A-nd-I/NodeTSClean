import pino from 'pino';

import { envs } from '../../config/envs.plugin.js';

const isDevelopment = !envs.PROD;

export const logger = isDevelopment
   ? pino({
        level: 'debug',
        transport: {
           target: 'pino-pretty',
           options: {
              colorize: true,
              singleLine: false,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
           },
        },
     })
   : pino({
        level: 'info',
     });
