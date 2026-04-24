import { defineConfig } from 'prisma/config';

import { envs } from './src/shared/config/envs.plugin.js';

export default defineConfig({
   schema: 'prisma/schema.prisma',
   migrations: {
      path: 'prisma/migrations',
   },
   datasource: {
      url: envs.POSTGRES_URL,
   },
});
