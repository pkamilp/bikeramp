import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateTripCommand } from '../create-trip.command';
import { Trip } from '../../models/trip.entity';
import { CurrencyEnum } from '../../models/currency.enum';
import { TripRepository } from '../../repositories/trip.repository';

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  constructor(private readonly tripRepository: TripRepository) {}

  async execute(command: CreateTripCommand) {
    const { startAddress, destinationAddress, price, deliveryDate } = command;

    // TODO calculate distance through some external APIs

    const trip = new Trip();
    trip.startAddress = startAddress;
    trip.destinationAddress = destinationAddress;
    trip.distance = 0;
    trip.price = price;
    trip.currency = CurrencyEnum.PLN;
    trip.deliveryDate = deliveryDate;

    await this.tripRepository.save(trip);

    return trip;
  }
}
