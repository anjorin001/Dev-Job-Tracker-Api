import { IsString, IsOptional, IsEnum } from "class-validator";
import { JobStatus, JobType } from "../job.entitty";

export class CreateJobDto {
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
}
