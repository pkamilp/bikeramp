import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DateTime } from 'luxon';

import { CreateTripCommand } from '../commands/create-trip.command';

@Injectable()
export class TripService {
  constructor(private commandBus: CommandBus) {}

  createTrip(startAddress: string, destinationAddress: string, price: number, date: DateTime) {
    return this.commandBus.execute(
      new CreateTripCommand(startAddress, destinationAddress, price, date),
    );
  }
}
