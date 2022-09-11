import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DateTime } from 'luxon';

import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/request/create-trip.dto';
import { Trip } from '../models/trip.entity';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiResponse({ status: 201, type: Trip })
  createTrip(@Body() input: CreateTripDto) {
    return this.tripService.createTrip(
      input.start_address,
      input.destination_address,
      input.price,
      DateTime.fromISO(input.date),
    );
  }
}
