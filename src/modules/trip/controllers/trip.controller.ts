import { Body, Controller, Post } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { DateTime } from 'luxon';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  createTrip(@Body() input: CreateTripDto) {
    return this.tripService.createTrip(
      input.start_address,
      input.destination_address,
      input.price,
      DateTime.fromISO(input.date),
    );
  }
}
