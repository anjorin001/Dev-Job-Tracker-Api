import { CreateJobDto } from "./dto/job-create-dto";
import { UpdateJobDto } from "./dto/job-update.dto";
import { Router } from "express";
import { validateDto } from "../../util/validateDto";
import jobController from "./job.controller";

const jobRouter = Router();

jobRouter.get("/job/:id", jobController.getJobs);

jobRouter.post(
  "/create-job",
  validateDto(CreateJobDto),
  jobController.createJob
);

jobRouter.patch(
  "/update-job",
  validateDto(UpdateJobDto),
  jobController.updateJob
);

jobRouter.delete("/delete-job", jobController.deleteJob);

export default jobRouter;
