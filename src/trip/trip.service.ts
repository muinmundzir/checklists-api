import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Trip } from '@app/trip/trip.entity';
import { CreateTrip } from '@app/trip/dto/create-trip.dto';
import { UserCtx } from '@app/types/user-ctx.type';
import { TripStatus } from '@app/types/status.enum';
import { OrderTrip } from '@app/order-trip/order-trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    @InjectRepository(OrderTrip)
    private readonly orderTripRepository: Repository<OrderTrip>,
  ) {}

  async create(tripDto: CreateTrip, ctx: UserCtx) {
    try {
      const { startLocation, endLocation } = tripDto;
      const { sub: id } = ctx;

      const trip = new Trip();
      trip.startLocation = startLocation;
      trip.endLocation = endLocation;
      trip.userId = id;
      trip.status = TripStatus.Pending;

      return { data: await this.tripRepository.save(trip) };
    } catch (error) {
      throw error;
    }
  }

  async cancel(tripId: string, ctx: UserCtx) {
    try {
      const { sub: id } = ctx;

      const trip = await this.tripRepository.findOne({
        where: {
          userId: id,
          id: tripId,
        },
      });

      if (!trip) throw new NotFoundException('Trip not found.');

      trip.status = TripStatus.Canceled;
      trip.updatedAt = new Date();

      const existOrderTrip = await this.orderTripRepository.findOne({
        where: {
          tripId,
        },
      });

      if (existOrderTrip) {
        existOrderTrip.status = TripStatus.Canceled;
        existOrderTrip.updatedAt = new Date();

        await this.orderTripRepository.save(existOrderTrip);
      }

      return {
        data: await this.tripRepository.save(trip),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const trips = await this.tripRepository.find({
        where: {
          userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return { data: trips };
    } catch (error) {
      throw error;
    }
  }

  async findCurrent(userId: string) {
    try {
      const trip = await this.tripRepository.findOne({
        where: {
          userId,
          status: In([TripStatus.Pending, TripStatus.Accepted]),
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return { data: trip };
    } catch (error) {
      throw error;
    }
  }
}
