export interface EnvVarsInterface {
  NODE_ENV: 'develop' | 'local' | 'product' | 'test';
  PORT: number;
  CORS: string | undefined;
  DB_TYPE: 'mysql' | 'mariadb';
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  JWT_SECRET_KEY: string;
}

export class MyCustomError extends Error {
  message: string;
  status: number;
  name: 'MyCustomError';
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'MyCustomError';
    this.status = status;
  }
}
