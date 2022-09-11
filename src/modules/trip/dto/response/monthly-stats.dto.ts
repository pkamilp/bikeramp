import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

import { ordinal } from './ordinal';

export class MonthlyStatsDto {
  @ApiProperty()
  day: string;

  @ApiProperty()
  total_distance: string;

  @ApiProperty()
  avg_ride: string;

  @ApiProperty()
  avg_price: string;

  constructor(
    day: string,
    totalDistance: number,
    avgDistance: number,
    avgPrice: number,
    currency: string,
  ) {
    const date = DateTime.fromJSDate(new Date(day));
    this.day = `${date.monthLong}, ${ordinal(date.day)}`;
    this.total_distance = `${totalDistance / 1000}km`;
    this.avg_ride = `${avgDistance / 1000}km`;
    this.avg_price = `${avgPrice.toFixed(2)}${currency}`;
  }
}
