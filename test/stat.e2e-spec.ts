import { INestApplication } from '@nestjs/common';
import { DateTime } from 'luxon';

import { ApiClientService } from './api-client.service';
import { setupTests } from './setup';
import { cleanup } from './cleanup';
import { TripRepository } from '../src/modules/trip/repositories/trip.repository';
import { Trip } from '../src/modules/trip/models/trip.entity';
import { CurrencyCode } from '../src/modules/trip/models/currency-code.enum';
import { Money } from '../src/modules/trip/models/money';

describe('StatController (e2e)', () => {
  let app: INestApplication;
  let apiClient: ApiClientService;
  let tripRepository: TripRepository;

  beforeAll(async () => {
    const setup = await setupTests();
    app = setup.app;
    apiClient = setup.apiClient;
    tripRepository = app.get(TripRepository);
  });

  afterAll(async () => {
    await cleanup(app);
  });

  beforeEach(async () => {
    await tripRepository.clear();
  });

  it('will properly return weekly stats', async () => {
    const firstTrip = Trip.create(
      'start address',
      'destination address',
      39000,
      Money.create(49, CurrencyCode.PLN),
      DateTime.now(),
    );

    const secondTrip = Trip.create(
      'start address',
      'destination address',
      1000,
      Money.create(0.75, CurrencyCode.PLN),
      DateTime.now(),
    );

    await tripRepository.save([firstTrip, secondTrip]);

    return apiClient
      .getWeeklyStats()
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          total_distance: '40km',
          total_price: '49.75PLN',
        });
      });
  });

  it('will properly return monthly stats', async () => {
    const now = DateTime.now();

    const firstTrip = Trip.create(
      'start address',
      'destination address',
      8000,
      Money.create(22.75, CurrencyCode.PLN),
      now.set({ day: 4 }),
    );

    const secondTrip = Trip.create(
      'start address',
      'destination address',
      4000,
      Money.create(22.75, CurrencyCode.PLN),
      now.set({ day: 4 }),
    );

    const thirdTrip = Trip.create(
      'start address',
      'destination address',
      3000,
      Money.create(15.5, CurrencyCode.PLN),
      now.set({ day: 5 }),
    );

    await tripRepository.save([firstTrip, secondTrip, thirdTrip]);

    return apiClient
      .getMonthlyStats()
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body).toMatchObject([
          {
            day: `${now.monthLong}, 4th`,
            total_distance: '12km',
            avg_ride: '6km',
            avg_price: '22.75PLN',
          },
          {
            day: `${now.monthLong}, 5th`,
            total_distance: '3km',
            avg_ride: '3km',
            avg_price: '15.50PLN',
          },
        ]);
      });
  });
});
