import 'dotenv/config';
import env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   PROD: env.get('PROD').required().asBool(),
   POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
   LOG_LEVEL: env.get('LOG_LEVEL').default('info').asString(),
   LOG_FILE_PATH: env.get('LOG_FILE_PATH').default('./logs/app.log').asString(),
   LOG_MAX_FILE_SIZE: env.get('LOG_MAX_FILE_SIZE').default('10M').asString(),
   LOG_MAX_FILES: env.get('LOG_MAX_FILES').default('7').asInt(),
   LOG_PRETTY_PRINT: env.get('LOG_PRETTY_PRINT').default('true').asBool(),
};
