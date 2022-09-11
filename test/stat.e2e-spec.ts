import { INestApplication } from '@nestjs/common';
import { DateTime } from 'luxon';

import { ApiClientService } from './api-client.service';
import { setupTests } from './setup';
import { cleanup } from './cleanup';
import { TripRepository } from '../src/modules/trip/repositories/trip.repository';
import { Trip } from '../src/modules/trip/models/trip.entity';
import { CurrencyEnum } from '../src/modules/trip/models/currency.enum';

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
    const firstTrip = new Trip();
    firstTrip.distance = 39000;
    firstTrip.deliveryDate = DateTime.now();
    firstTrip.price = 49;
    firstTrip.currency = CurrencyEnum.PLN;
    firstTrip.startAddress = 'start address';
    firstTrip.destinationAddress = 'destination address';

    const secondTrip = new Trip();
    secondTrip.distance = 1000;
    secondTrip.deliveryDate = DateTime.now();
    secondTrip.price = 0.75;
    secondTrip.currency = CurrencyEnum.PLN;
    secondTrip.startAddress = 'start address';
    secondTrip.destinationAddress = 'destination address';

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

    const firstTrip = new Trip();
    firstTrip.distance = 8000;
    firstTrip.deliveryDate = now.set({ day: 4 });
    firstTrip.price = 22.75;
    firstTrip.currency = CurrencyEnum.PLN;
    firstTrip.startAddress = 'start address';
    firstTrip.destinationAddress = 'destination address';

    const secondTrip = new Trip();
    secondTrip.distance = 4000;
    secondTrip.deliveryDate = now.set({ day: 4 });
    secondTrip.price = 22.75;
    secondTrip.currency = CurrencyEnum.PLN;
    secondTrip.startAddress = 'start address';
    secondTrip.destinationAddress = 'destination address';

    const thirdTrip = new Trip();
    thirdTrip.distance = 3000;
    thirdTrip.deliveryDate = now.set({ day: 5 });
    thirdTrip.price = 15.5;
    thirdTrip.currency = CurrencyEnum.PLN;
    thirdTrip.startAddress = 'start address';
    thirdTrip.destinationAddress = 'destination address';

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
