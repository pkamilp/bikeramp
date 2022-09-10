import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class TripService {
  createTrip(startAddress: string, destinationAddress: string, price: number, date: DateTime) {
    return true;
  }
}
