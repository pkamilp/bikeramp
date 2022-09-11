import { INestApplication } from '@nestjs/common';
import { DateTime } from 'luxon';

import { ApiClientService } from './api-client.service';
import { setupTests } from './setup';
import { cleanup } from './cleanup';

describe('TripController (e2e)', () => {
  let app: INestApplication;
  let apiClient: ApiClientService;

  beforeAll(async () => {
    const setup = await setupTests();
    app = setup.app;
    apiClient = setup.apiClient;
  });

  afterAll(async () => {
    await cleanup(app);
  });

  it('will properly create trip', () => {
    const startAddress = 'start_address';
    const destinationAddress = 'destination_address';
    const price = 1.35;
    const date = DateTime.now();

    return apiClient
      .createTrip(startAddress, destinationAddress, price, date)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: expect.any(String),
          startAddress: startAddress,
          destinationAddress: destinationAddress,
          distance: 100,
          price,
        });
      });
  });

  it('wont allow to create trip with negative price', () => {
    const startAddress = 'start_address';
    const destinationAddress = 'destination_address';
    const price = -1;
    const date = DateTime.now();

    return apiClient
      .createTrip(startAddress, destinationAddress, price, date)
      .expect(400)
      .expect((res) => {
        expect(res.body.message[0]).toBe('price must not be less than 0');
      });
  });

  it('wont allow to create trip with price having more than 2 decimal places', () => {
    const startAddress = 'start_address';
    const destinationAddress = 'destination_address';
    const price = 3.141;
    const date = DateTime.now();

    return apiClient
      .createTrip(startAddress, destinationAddress, price, date)
      .expect(400)
      .expect((res) => {
        expect(res.body.message[0]).toBe(
          'price must be a number conforming to the specified constraints',
        );
      });
  });
});
