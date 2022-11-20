import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

// TODO: load configuration from .env
const dbOptions: MikroOrmModuleSyncOptions = {
  dbName: 'products',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  entities: ['./dist/src/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'mysql',
  debug: true,
  seeder: {
    path: './seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default dbOptions;
