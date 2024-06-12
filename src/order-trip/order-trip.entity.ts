import { Trip } from '@app/trip/trip.entity';
import { User } from '@app/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_trips' })
export class OrderTrip {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'trip_id' })
  tripId: string;

  @Column({ name: 'driver_id' })
  driverId: string;

  @Column({
    type: 'enum',
    enum: ['accepted', 'completed', 'canceled'],
    nullable: true,
  })
  status: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orderTrips)
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @ManyToOne(() => Trip, (trip) => trip.orderTrip)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;
}
