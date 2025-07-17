import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Job } from "../job/job.entitty";
import { Exclude } from "class-transformer";

@Entity()
@Index(["email"], { unique: true })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({ nullable: true })
  career?: string;

  @Column({ nullable: true })
  bio?: string;

  // One user can have many jobs
  @OneToMany(() => Job, (job) => job.user)
  jobs!: Job[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
