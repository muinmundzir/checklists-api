import { ChecklistItem } from '@app/checklist-item/checklist-item.entity';
import { User } from '@app/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('checklists')
export class Checklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ name: 'header_url' })
  headerUrl: string;

  @Column({ name: 'user_id' })
  userId: string;

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

  @ManyToOne(() => User, (user) => user.checklists)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ChecklistItem, (checklistItem) => checklistItem.checklist)
  items: ChecklistItem[];
}
