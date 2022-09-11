import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trip } from './models/trip.entity';
import { controllers } from './controllers';
import { services } from './services';
import { commandHandlers } from './commands/handlers';
import { queries } from './queries';
import { repositories } from './repositories';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Trip])],
  controllers: [...controllers],
  providers: [...services, ...commandHandlers, ...queries, ...repositories],
})
export class TripModule {}
