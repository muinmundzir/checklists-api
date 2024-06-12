import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@app/user/user.entity';
import { OrderTrip } from '@app/order-trip/order-trip.entity';

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'start_location' })
  startLocation: string;

  @Column({ name: 'end_location' })
  endLocation: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'completed', 'canceled'],
    default: 'pending',
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

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderTrip, (orderTrip) => orderTrip.trip)
  orderTrip: OrderTrip;
}
