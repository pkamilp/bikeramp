import { Test } from '@nestjs/testing';
import { DateTime } from 'luxon';

import { TripController } from './trip.controller';
import { CreateTripDto } from '../dto/create-trip.dto';
import { TripModule } from '../trip.module';

describe('TripController', () => {
  let tripController: TripController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [TripModule],
    }).compile();

    await app.init();
    tripController = app.get(TripController);
  });

  it('should create trip', async () => {
    expect(
      await tripController.createTrip(
        new CreateTripDto('start_address', 'destination_address', 1, DateTime.now().toISO()),
      ),
    ).toBe(true);
  });
});
