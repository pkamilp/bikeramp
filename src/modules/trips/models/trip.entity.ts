import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { DateTime } from 'luxon';

@Entity({ name: 'trips' })
export class Trip extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ name: 'start_address' })
  public startAddress!: string;

  @Column({ name: 'destination_address' })
  public destinationAddress!: string;

  @Column()
  public distance!: number;

  @Column()
  public price!: number;

  @Column()
  public currency!: string;

  @Column({
    type: 'timestamptz',
    name: 'delivery_date',
  })
  public deliveryDate!: DateTime;
}
