import { DataSource } from 'typeorm';

import { Sample } from './models';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env;

const AppDataSource = new DataSource({
   type: 'postgres',
   host: DB_HOST,
   port: +DB_PORT,
   username: DB_USER,
   password: DB_PASS,
   database: DB_NAME,
   synchronize: NODE_ENV == 'development' ? true : false,
   logging: NODE_ENV == 'development' ? true : false,
   entities: [Sample],
   subscribers: [],
   migrations: [],
});

export default AppDataSource;

