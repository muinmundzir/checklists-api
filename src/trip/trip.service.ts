import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '@app/trip/trip.entity';
import { CreateTrip } from '@app/trip/dto/create-trip.dto';
import { UserCtx } from '@app/types/user-ctx.type';
import { TripStatus } from '@app/types/status.enum';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
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

      return await this.tripRepository.save(trip);
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

      return await this.tripRepository.save(trip);
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

      return trips;
    } catch (error) {
      throw error;
    }
  }

  async findCurrent(userId: string) {
    try {
      const trip = await this.tripRepository.findOne({
        where: {
          userId,
          status: TripStatus.Pending || TripStatus.Accepted,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return trip;
    } catch (error) {
      throw error;
    }
  }
}
