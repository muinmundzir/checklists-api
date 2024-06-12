import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderTripController } from '@app/order-trip/order-trip.controller';
import { OrderTripService } from '@app/order-trip/order-trip.service';
import { OrderTrip } from '@app/order-trip/order-trip.entity';
import { Trip } from '@app/trip/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTrip, Trip])],
  controllers: [OrderTripController],
  providers: [OrderTripService],
})
export class OrderTripModule {}
