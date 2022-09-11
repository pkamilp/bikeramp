import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { controllers } from './controllers';
import { services } from './services';
import { commandHandlers } from './commands/handlers';
import { repositories } from './repositories';
import { Trip } from './models/trip.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Trip])],
  controllers: [...controllers],
  providers: [...services, ...commandHandlers, ...repositories],
})
export class TripModule {}
