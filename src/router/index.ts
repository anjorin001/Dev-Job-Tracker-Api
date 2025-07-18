import express from "express";
import authRouter from "../modules/auth/auth.route";
import jobRouter from "../modules/job/job.route";
import userRouter from "../modules/users/user.route";
import { undefinedRoute } from "../middleware/undefinedRoutes";

const appRouter = express.Router();

appRouter.use("/auth", authRouter)
appRouter.use("/", jobRouter)
appRouter.use("/", userRouter)
appRouter.use(undefinedRoute);

export const Router = appRouter;