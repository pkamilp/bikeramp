import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

import { CurrencyCode } from './currency-code.enum';
import { BaseEntity } from '../../database/base.entity';
import { DateTimeTransformer } from '../../database/datetime.transformer';
import { Money } from './money';

@Entity({ name: 'trips' })
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  private id!: string;

  @Column({ name: 'start_address' })
  @ApiProperty()
  private startAddress!: string;

  @Column({ name: 'destination_address' })
  @ApiProperty()
  private destinationAddress!: string;

  @Column()
  @ApiProperty()
  private distance!: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @ApiProperty()
  private price!: number;

  @Column()
  @ApiProperty({ enum: CurrencyCode })
  private currency!: CurrencyCode;

  @Column({
    type: 'timestamptz',
    name: 'delivery_date',
    transformer: new DateTimeTransformer(),
  })
  @ApiProperty({ type: String })
  private deliveryDate!: DateTime;

  static create(
    startAddress: string,
    destinationAddress: string,
    distance: number,
    price: Money,
    deliveryDate: DateTime,
  ) {
    const trip = new Trip();
    trip.startAddress = startAddress;
    trip.destinationAddress = destinationAddress;
    trip.distance = distance;
    trip.price = price.value;
    trip.currency = price.currency;
    trip.deliveryDate = deliveryDate;
    return trip;
  }
}
