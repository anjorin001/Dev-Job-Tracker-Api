import { Router } from "express";
import userService from "./user.service";
import userController from "./user.controller";
const userRouter = Router();

// #	Method	Endpoint	Purpose
// 2	GET	/users	Get all users
// 3	GET	/users/:id	Get user by ID
// 5	DELETE	/users/:id	Delete user
//TODO 6	GET	/users/:id/jobs	Get user's jobs

userRouter.get("/user", userController.getUsers); //query
userRouter.patch("/user/:id", userController.updateUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;
