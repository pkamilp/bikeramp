import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from 'luxon';

import { CurrencyEnum } from './currency.enum';
import { BaseEntity } from '../../database/base.entity';
import { DateTimeTransformer } from '../../database/datetime.transformer';

@Entity({ name: 'trips' })
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ name: 'start_address' })
  public startAddress!: string;

  @Column({ name: 'destination_address' })
  public destinationAddress!: string;

  @Column()
  public distance!: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  public price!: number;

  @Column()
  public currency!: CurrencyEnum;

  @Column({
    type: 'timestamptz',
    name: 'delivery_date',
    transformer: new DateTimeTransformer(),
  })
  public deliveryDate!: DateTime;
}