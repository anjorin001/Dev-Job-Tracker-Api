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

  async getJob(jobId: any) {
    const { id } = jobId;

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

  async updateJob(jobId: any, input: UpdateJobDto) {
    if (!input)
      throw new ValidationError("at least one update field is required");

    const foundJob = await this.jobRepository.findOneBy({ id: jobId });
    if (!foundJob) throw new NotFoundError("job not found, invalid job ID");

    const updatedJob = await this.jobRepository.update({ id: jobId }, input);
    return updatedJob;
  }

  async deleteJob(jobId: any) {
    const deletedJob = await this.jobRepository.delete({ id: jobId });
    if (!deletedJob) throw new NotFoundError("job not found, invalid Job Id");
    return deletedJob;
  }
}

export default new JobService();
