import * as dotenv from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';
import * as Joi from 'joi';
import { EnvVarsInterface } from '../interfaces/index';

dotenv.config({
  path: join(cwd(), '.env'),
});

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('develop', 'local', 'product', 'test')
    .default('local')
    .required(),
  PORT: Joi.number().default(3000),
  CORS: Joi.string().default('*'),
}).unknown();

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value as EnvVarsInterface;

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  CORS: envVars.CORS,
  DB_TYPE: envVars.DB_TYPE,
  DB_NAME: envVars.DB_NAME,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_USERNAME: envVars.DB_USERNAME,
  DB_PASSWORD: envVars.DB_PASSWORD,
};

export default config;
