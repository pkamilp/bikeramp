import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class MockTypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bikeramp',
      password: 'bikeramp',
      database: 'bikeramp-tests',
      dropSchema: true,
      migrationsRun: true,
      autoLoadEntities: true,
      migrations: ['src/migrations/*.ts'],
    };
  }
}
