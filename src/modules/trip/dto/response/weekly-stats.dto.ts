import { ApiProperty } from '@nestjs/swagger';

export class WeeklyStatsDto {
  @ApiProperty()
  total_distance: string;

  @ApiProperty()
  total_price: string;

  constructor(totalDistance: number, totalPrice: number, currency: string) {
    this.total_distance = `${totalDistance / 1000}km`;
    this.total_price = `${totalPrice}${currency}`;
  }
}
