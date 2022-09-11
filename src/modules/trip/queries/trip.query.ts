import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DateTime } from 'luxon';

import { Trip } from '../models/trip.entity';
import { WeeklyStatsDto } from '../dto/response/weekly-stats.dto';
import { MonthlyStatsDto } from '../dto/response/monthly-stats.dto';
import { CurrencyEnum } from '../models/currency.enum';

@Injectable()
export class TripQuery {
  constructor(private readonly dataSource: DataSource) {}

  public async getWeeklyStats() {
    const startOfWeek = DateTime.now().startOf('week');
    const endOfWeek = DateTime.now().endOf('week');

    const resp = await this.dataSource
      .createQueryBuilder(Trip, 'trip')
      .select('SUM(distance)', 'distance')
      .addSelect('SUM(price)', 'price')
      .addSelect('currency')
      .where('delivery_date BETWEEN :startOfWeek AND :endOfWeek', { startOfWeek, endOfWeek })
      .groupBy('currency')
      .getRawOne();

    return new WeeklyStatsDto(
      resp ? Number(resp.distance) : 0,
      resp ? Number(resp.price) : 0,
      resp ? resp.currency : CurrencyEnum.PLN,
    );
  }

  public async getMonthlyStats() {
    const startOfMonth = DateTime.now().startOf('month');
    const endOfMonth = DateTime.now().endOf('month');

    const resp = await this.dataSource
      .createQueryBuilder(Trip, 'trip')
      .select('SUM(distance)', 'distance_sum')
      .addSelect('AVG(distance)', 'distance_avg')
      .addSelect('AVG(price)', 'price_avg')
      .addSelect('currency', 'currency')
      .addSelect('delivery_date::date', 'day')
      .andWhere('delivery_date BETWEEN :startOfMonth AND :endOfMonth', {
        startOfMonth,
        endOfMonth,
      })
      .groupBy('delivery_date::date')
      .addGroupBy('currency')
      .orderBy('delivery_date::date', 'ASC')
      .getRawMany();

    return resp.map(
      (row) =>
        new MonthlyStatsDto(
          row.day,
          Number(row.distance_sum),
          Number(row.distance_avg),
          Number(row.price_avg),
          row.currency,
        ),
    );
  }
}
