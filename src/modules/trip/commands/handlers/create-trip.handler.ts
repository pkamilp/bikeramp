import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreateTripCommand } from '../create-trip.command';
import { Trip } from '../../models/trip.entity';
import { CurrencyEnum } from '../../models/currency.enum';
import { TripRepository } from '../../repositories/trip.repository';
import { GoogleMapsApiService } from '../../services/google-maps-api.service';

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly googleMapsApiService: GoogleMapsApiService,
  ) {}

  async execute(command: CreateTripCommand) {
    const { startAddress, destinationAddress, price, deliveryDate } = command;

    if (!(await this.googleMapsApiService.isValidAddress(startAddress))) {
      throw new BadRequestException(`Invalid start address`);
    }

    if (
      destinationAddress !== startAddress &&
      !(await this.googleMapsApiService.isValidAddress(destinationAddress))
    ) {
      throw new BadRequestException(`Invalid destination address`);
    }

    const distance = await this.googleMapsApiService.getDistance(startAddress, destinationAddress);

    const trip = new Trip();
    trip.startAddress = startAddress;
    trip.destinationAddress = destinationAddress;
    trip.distance = distance;
    trip.price = price;
    trip.currency = CurrencyEnum.PLN;
    trip.deliveryDate = deliveryDate;

    await this.tripRepository.save(trip);

    return trip;
  }
}
