import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigSchemaValidator } from './config/schema.validator';
import { TripModule } from './modules/trip/trip.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigSchemaValidator,
    }),
    DatabaseModule,
    TripModule,
  ],
})
export class AppModule {}
