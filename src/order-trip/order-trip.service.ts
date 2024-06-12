import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderTrip } from '@app/order-trip/order-trip.entity';
import { Trip } from '@app/trip/trip.entity';
import { TripStatus } from '@app/types/status.enum';

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
}
