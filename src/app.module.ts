import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigSchemaValidator } from './config/schema.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema: ConfigSchemaValidator,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
