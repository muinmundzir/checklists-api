import * as argon from 'argon2';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Trip } from '@app/trip/trip.entity';
import { UserRole } from '@app/user-role/user-role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'user_role_id' })
  userRoleId: string;

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

  @OneToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  userRole: UserRole;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password);
  }
}
