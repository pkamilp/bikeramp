import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import request from 'supertest';

@Injectable()
export class ApiClientService {
  private url: string;

  public setUrl(url: string) {
    this.url = url;
  }

  createTrip(startAddress: string, destinationAddress: string, price: number, date: DateTime) {
    return request(this.url).post('/trips').send({
      start_address: startAddress,
      destination_address: destinationAddress,
      price,
      date: date.toISO(),
    });
  }

  getWeeklyStats() {
    return request(this.url).get('/stats/weekly');
  }

  getMonthlyStats() {
    return request(this.url).get('/stats/monthly');
  }
}
