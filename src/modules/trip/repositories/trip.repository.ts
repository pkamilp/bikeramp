import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../database/base.repository';
import { Trip } from '../models/trip.entity';

@Injectable()
export class TripRepository extends BaseRepository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }
}
