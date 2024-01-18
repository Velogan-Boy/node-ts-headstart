import { cleanEnv, port, str } from 'envalid';

export const validateEnv = () => {
   cleanEnv(process.env, {
      NODE_ENV: str(),
      PORT: port(),
      DB_HOST: str(),
      DB_PORT: port(),
      DB_USER: str(),
      DB_PASS: str(),
      DB_NAME: str(),
      JWT_SECRET: str(),
      JWT_SIGNING_ALGO: str(),
   });
};

