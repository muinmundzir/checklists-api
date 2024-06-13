import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripService } from '@app/trip/trip.service';
import { TripController } from '@app/trip/trip.controller';
import { Trip } from '@app/trip/trip.entity';
import { OrderTrip } from '@app/order-trip/order-trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, OrderTrip])],
  providers: [TripService],
  controllers: [TripController],
})
export class TripModule {}
