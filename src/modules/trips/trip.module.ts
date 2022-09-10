import { Module } from '@nestjs/common';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';

@Module({
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
