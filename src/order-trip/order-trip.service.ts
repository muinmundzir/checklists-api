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
        order: {
          createdAt: 'ASC',
        },
      });

      return { data: trips };
    } catch (error) {
      throw error;
    }
  }

  async getOrderTripsHistory(driverId: string) {
    try {
      const orderTrip = await this.orderTripRepository
        .createQueryBuilder('orderTrip')
        .leftJoinAndSelect('orderTrip.trip', 'trip')
        .leftJoinAndSelect('trip.user', 'user')
        .leftJoinAndSelect('orderTrip.driver', 'driver')
        .select([
          'orderTrip.id',
          'orderTrip.updatedAt',
          'trip.id',
          'trip.startLocation',
          'trip.endLocation',
          'user.id',
          'user.name',
          'driver.id',
          'driver.name',
        ])
        .where('orderTrip.driver = :driverId', { driverId })
        .orderBy('orderTrip.updatedAt', 'DESC')
        .getMany();

      return { data: orderTrip };
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
      orderTrip.updatedAt = new Date();

      const savedOrderTrip = await this.orderTripRepository.save(orderTrip);

      // update trip status
      trip.status = TripStatus.Accepted;
      await this.tripRepository.save(trip);

      return { data: savedOrderTrip };
    } catch (error) {
      throw error;
    }
  }

  async cancelTrip(orderTripId: string, ctx: UserCtx) {
    {
      try {
        const { sub: driverId } = ctx;

        const orderTrip = await this.orderTripRepository.findOne({
          relations: ['trip'],
          where: {
            id: orderTripId,
            driverId,
          },
        });

        if (!orderTrip) throw new NotFoundException('Order not found.');

        orderTrip.status = TripStatus.Canceled;
        orderTrip.updatedAt = new Date();

        // update trip status
        orderTrip.trip.status = TripStatus.Canceled;
        orderTrip.trip.updatedAt = new Date();

        await this.orderTripRepository.save(orderTrip);
        await this.tripRepository.save(orderTrip.trip);

        // delete trip object
        delete orderTrip.trip;

        return { data: orderTrip };
      } catch (error) {
        throw error;
      }
    }
  }

  async completeTrip(orderTripId: string, ctx: UserCtx) {
    {
      try {
        const { sub: driverId } = ctx;

        const orderTrip = await this.orderTripRepository.findOne({
          relations: ['trip'],
          where: {
            id: orderTripId,
            driverId,
          },
        });

        if (!orderTrip) throw new NotFoundException('Order not found.');

        orderTrip.status = TripStatus.Completed;
        orderTrip.updatedAt = new Date();

        // update trip status
        orderTrip.trip.status = TripStatus.Completed;
        orderTrip.trip.updatedAt = new Date();

        await this.orderTripRepository.save(orderTrip);
        await this.tripRepository.save(orderTrip.trip);

        // delete trip object
        delete orderTrip.trip;

        return {
          data: orderTrip,
        };
      } catch (error) {
        throw error;
      }
    }
  }

  async getCurrentOrderTrip(driverId: string) {
    try {
      const orderTrip = await this.orderTripRepository
        .createQueryBuilder('orderTrip')
        .leftJoinAndSelect('orderTrip.trip', 'trip')
        .leftJoinAndSelect('orderTrip.driver', 'driver')
        .leftJoinAndSelect('trip.user', 'user')
        .select([
          'orderTrip.id',
          'orderTrip.status',
          'trip.id',
          'trip.startLocation',
          'trip.endLocation',
          'trip.status',
          'trip.createdAt',
          'driver.id',
          'driver.name',
          'user.id',
          'user.name',
        ])
        .where('orderTrip.driverId = :driverId', { driverId })
        .andWhere('orderTrip.status = :status', { status: TripStatus.Accepted })
        .getOne();

      if (!orderTrip)
        throw new NotFoundException(
          'Order trip not found, either it has been completed or it has been canceled',
        );

      return { data: orderTrip };
    } catch (error) {
      throw error;
    }
  }
}
