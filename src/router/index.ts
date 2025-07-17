import express from "express";
import authRouter from "../modules/auth/auth.route";
import jobRouter from "../modules/job/job.route";
import userRouter from "../modules/users/user.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter)
appRouter.use("/", jobRouter)
appRouter.use("/user", userRouter)
export const Router = appRouter;