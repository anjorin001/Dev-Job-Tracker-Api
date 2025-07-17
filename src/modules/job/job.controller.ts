import { ExpressContext } from "../../util/ExpressContext";
import { sendSuccess } from "../../util/responseHandler";
import jobService from "./job.service";

class UserController {
  async getJobs({ req, res, next }: ExpressContext) {
    try {
      const jobs = await jobService.getJob(req.params);
      return sendSuccess(res, "jobs fetched successfully", 200, jobs);
    } catch (err) {
      next(err);
    }
  }

  async createJob({ req, res, next }: ExpressContext) {
    try {
      const createdJob = await jobService.createJob(req.body);
      return sendSuccess(res, "job created successfully", 201, createdJob);
    } catch (err) {
      next(err);
    }
  }

  async updateJob({ req, res, next }: ExpressContext) {
    try {
      const updatedJob = await jobService.updateJob(req.params, req.body);
      return sendSuccess(res, "jobs updated successfully", 200, updatedJob);
    } catch (err) {
      next(err);
    }
  }

  async deleteJob({ req, res, next }: ExpressContext) {
    try {
      const deletedJob = await jobService.deleteJob(req.params);
      return sendSuccess(res, "jobs fetched successfully", 200, deletedJob);
    } catch (err) {
      next(err);
    }
  }
}


export default new UserController()