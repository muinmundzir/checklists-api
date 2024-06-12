import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderTrip } from '@app/order-trip/order-trip.entity';
import { Trip } from '@app/trip/trip.entity';
import { TripStatus } from '@app/types/status.enum';
import { UserCtx } from '@app/types/user-ctx.type';

@Injectable()
export class OrderTripService {
  constructor(
    @InjectRepository(OrderTrip)
    private readonly orderTripRepository: Repository<OrderTrip>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async getTrips() {
    try {
      const trips = await this.tripRepository.find({
        where: {
          status: TripStatus.Pending,
        },
      });

      return trips;
    } catch (error) {
      throw error;
    }
  }

  async confirmTrip(tripId: string, ctx: UserCtx) {
    try {
      const { sub: driverId } = ctx;

      const trip = await this.tripRepository.findOneById(tripId);

      if (!trip) throw new NotFoundException('Trip not found.');

      const orderTrip = new OrderTrip();
      orderTrip.tripId = tripId;
      orderTrip.driverId = driverId;
      orderTrip.status = TripStatus.Accepted;

      const savedOrderTrip = await this.orderTripRepository.save(orderTrip);

      // update trip status
      trip.status = TripStatus.Accepted;
      await this.tripRepository.save(trip);

      return savedOrderTrip;
    } catch (error) {
      throw error;
    }
  }
}
