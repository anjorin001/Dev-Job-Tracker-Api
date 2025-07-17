import { IsEnum, IsOptional, IsString } from "class-validator";
import { JobStatus, JobType } from "../job.entitty";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class JobDto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @IsOptional()
  appliedDate?: Date;

  @IsString()
  location: string;

  @IsEnum(JobType)
  jobType: JobType;

  @IsOptional()
  @IsString()
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;
}
