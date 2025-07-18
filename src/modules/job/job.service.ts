import { Repository } from "typeorm";
import { JobDto } from "./dto/job.dto";
import { Job } from "./job.entitty";
import { UpdateJobDto } from "./dto/job-update.dto";
import { NotFoundError, ValidationError } from "../../exception/baseError";
import { AppDataSource } from "../../config/databaseConfig";
import { CreateJobDto } from "./dto/job-create-dto";

class JobService {
  private readonly jobRepository: Repository<Job>;

  constructor() {
    this.jobRepository = AppDataSource.getRepository(Job);
  }

  async getJob(id: string) {
    const filter = {} as any;
    if (id) filter.id = id;

    const jobs = await this.jobRepository.find({
      where: filter,
      select: ["company", "position", "status", "notes", "location", "jobType"],
    });

    return jobs;
  }

  async createJob(input: CreateJobDto) {
    const newJob = this.jobRepository.create(input);
    return await this.jobRepository.save(newJob);
  }

  async updateJob(id: string, input: UpdateJobDto) {
    if (!input || Object.keys(input).length === 0) {
      throw new ValidationError("At least one update field is required");
    }

    const foundJob = await this.jobRepository.findOneBy({ id });
    if (!foundJob) {
      throw new NotFoundError("Job not found, invalid job ID");
    }

    await this.jobRepository.update({ id }, input);

    const updatedJob = await this.jobRepository.findOneBy({ id });
    return updatedJob;
  }

  async deleteJob(id: string) {
    const deleteResult = await this.jobRepository.delete({ id });

    if (deleteResult.affected === 0) {
      throw new NotFoundError("Job not found, invalid Job ID");
    }

    return {
      message: "Job deleted successfully",
      affected: deleteResult.affected,
    };
  }
}

export default new JobService();
