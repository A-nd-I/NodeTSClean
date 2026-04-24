import 'dotenv/config';
import env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   PROD: env.get('PROD').required().asBool(),
   POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
};
