import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, Min } from 'class-validator';

export class CreateTripDto {
  @ApiProperty()
  @IsNotEmpty()
  start_address: string;

  @ApiProperty()
  @IsNotEmpty()
  destination_address: string;

  @ApiProperty()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsDateString()
  date: string;

  constructor(start_address: string, destination_address: string, price: number, date: string) {
    this.start_address = start_address;
    this.destination_address = destination_address;
    this.price = price;
    this.date = date;
  }
}
