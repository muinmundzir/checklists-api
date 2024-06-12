import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripService } from '@app/trip/trip.service';
import { TripController } from '@app/trip/trip.controller';
import { Trip } from '@app/trip/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripService],
  controllers: [TripController],
})
export class TripModule {}
