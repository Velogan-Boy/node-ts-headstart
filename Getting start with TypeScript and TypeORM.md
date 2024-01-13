## Setting Up Typescript

#### Install Typescript and @types packages required

``` npm i -D typescript @types/express @types/node  ```

#### Generate tsconfig.json

``` npx tsc --init ```


#### Running typescript in node

> Note: To enable typescript in node use `ts-node`

``` npx ts-node src/index.ts ```

#### Build command

> Make sure you set the outDir in the tsconfig.json

``` npx tsc ```

> You can use ts-node-dev as an alternative for nodemon ( dev server )


#### NPM script

```
      "start": "node build/index.js",
      "build": "npx tsc",
      "dev": "nodemon src/index.ts"
```

## Setting up TypeORM

#### Install TypeORM Package

``` npm install typeorm ```

#### Install reflect-metadata shim

``` npm install reflect-metadata ```

> and import it somewhere in the global place of your app (for example in index.ts):

``` import "reflect-metadata" ```

#### Install Database driver 

``` npm install pg (mysql/mongodb) ```

#### Typescript configuration

``` 
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```


#### Create Datasource in src directory

```
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'admin',
   database: 'sample',
    synchronize: true,
   logging: true,
   entities: [Sample],
   subscribers: [],
   migrations: [],
});

AppDataSource.initialize()
   .then(() => {
      console.log('✅ Database connected successfully !');
   })
   .catch((err) => {
      console.error('❌ Database connection failed', err);
   });


```

> Note: Please do not include strict true in tsconfig.json