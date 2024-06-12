import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '@app/trip/trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
  ) {}

  async findAll(userId: string) {
    try {
      const trips = await this.tripRepository.find({
        where: {
          userId,
        },
      });

      return trips;
    } catch (error) {
      throw error;
    }
  }
}
