// TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entity
import { User } from './User';

@Entity()
export class Measurements extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  weight: number;

  @Column('timestamp')
  weighingDate: Date | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('timestamp', { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.measurement, {
    cascade: true,
  })
  user: User;
}
