import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

// TODO: load configuration from .env
const dbOptions: MikroOrmModuleSyncOptions = {
  dbName: 'products',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  autoLoadEntities: true,
  type: 'mysql',
  debug: true,
};

export default dbOptions;
