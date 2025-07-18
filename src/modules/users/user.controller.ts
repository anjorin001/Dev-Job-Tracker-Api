import { sendSuccess } from "../../util/responseHandler";
import userService from "./user.service";
import { Request, Response, NextFunction } from "express";

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUser(req.query.id);
      return sendSuccess(res, null, 200, users);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      return sendSuccess(res, "updated successfull", 200, updatedUser);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      return sendSuccess(res, "deleted successfull", 200, deletedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
