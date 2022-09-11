import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from 'luxon';

import { CurrencyEnum } from './currency.enum';
import { BaseEntity } from '../../database/base.entity';
import { DateTimeTransformer } from '../../database/datetime.transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'trips' })
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id!: string;

  @Column({ name: 'start_address' })
  @ApiProperty()
  public startAddress!: string;

  @Column({ name: 'destination_address' })
  @ApiProperty()
  public destinationAddress!: string;

  @Column()
  @ApiProperty()
  public distance!: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @ApiProperty()
  public price!: number;

  @Column()
  @ApiProperty({ enum: CurrencyEnum })
  public currency!: CurrencyEnum;

  @Column({
    type: 'timestamptz',
    name: 'delivery_date',
    transformer: new DateTimeTransformer(),
  })
  @ApiProperty({ type: String })
  public deliveryDate!: DateTime;
}
