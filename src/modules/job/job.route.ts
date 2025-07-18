import { CreateJobDto } from "./dto/job-create-dto";
import { UpdateJobDto } from "./dto/job-update.dto";
import { Router } from "express";
import { validateDto } from "../../util/validateDto";
import jobController from "./job.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const jobRouter = Router();

jobRouter.use(authMiddleware)

jobRouter.get("/job", jobController.getJobs);

jobRouter.post(
  "/create-job",
  validateDto(CreateJobDto),
  jobController.createJob
);

jobRouter.patch(
  "/update-job/:id",
  validateDto(UpdateJobDto),
  jobController.updateJob
);

jobRouter.delete("/delete-job/:id", jobController.deleteJob);

export default jobRouter;
