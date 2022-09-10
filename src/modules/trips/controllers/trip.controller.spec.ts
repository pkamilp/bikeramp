import { Test } from '@nestjs/testing';
import { DateTime } from 'luxon';

import { TripController } from './trip.controller';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/create-trip.dto';

describe('TripController', () => {
  let tripController: TripController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    }).compile();

    tripController = app.get(TripController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        tripController.createTrip(
          new CreateTripDto('start_address', 'destination_address', 1, DateTime.now().toISO()),
        ),
      ).toBe(true);
    });
  });
});
