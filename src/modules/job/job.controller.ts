import { ExpressContext } from "../../util/ExpressContext";
import { sendSuccess } from "../../util/responseHandler";
import jobService from "./job.service";
import { Request, Response, NextFunction } from "express";

class UserController {
  async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await jobService.getJob(req.query.id as string);
      return sendSuccess(res, "jobs fetched successfully", 200, jobs);
    } catch (err) {
      next(err);
    }
  }

  async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const createdJob = await jobService.createJob(req.body);
      return sendSuccess(res, "job created successfully", 201, createdJob);
    } catch (err) {
      next(err);
    }
  }

  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedJob = await jobService.updateJob(req.params.id, req.body);
      return sendSuccess(res, "jobs updated successfully", 200, updatedJob);
    } catch (err) {
      next(err);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedJob = await jobService.deleteJob(req.params.id);
      return sendSuccess(res, "jobs fetched successfully", 200, deletedJob);
    } catch (err) {
      next(err);
    }
  }
}


export default new UserController()