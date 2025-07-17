import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../users/user.entity';

export enum JobStatus {
  APPLIED = 'applied',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  userId: string;

  @ManyToOne(() => User, (user) => user.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @IsString()
  company: string;

  @Column()
  @IsString()
  position: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.APPLIED,
  })
  @IsEnum(JobStatus)
  status: JobStatus;

  @Column()
  @CreateDateColumn()
  appliedDate: Date;

  @Column()
  @IsString()
  location: string;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.FULL_TIME,
  })
  @IsEnum(JobType)
  jobType: JobType;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
