import { Controller, Get } from '@nestjs/common';

import { TripQuery } from '../queries/trip.query';
import { WeeklyStatsDto } from '../dto/response/weekly-stats.dto';
import { MonthlyStatsDto } from '../dto/response/monthly-stats.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('stats')
export class StatController {
  constructor(private readonly tripQuery: TripQuery) {}

  @Get('weekly')
  @ApiResponse({ type: WeeklyStatsDto })
  getWeeklyStats() {
    return this.tripQuery.getWeeklyStats();
  }

  @Get('monthly')
  @ApiResponse({ type: MonthlyStatsDto, isArray: true })
  getMonthlyStats() {
    return this.tripQuery.getMonthlyStats();
  }
}
