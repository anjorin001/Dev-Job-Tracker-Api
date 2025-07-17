import { ExpressContext } from "../../util/ExpressContext";
import { sendSuccess } from "../../util/responseHandler";
import userService from "./user.service";

class UserController {
  async getUsers({ req, res, next }: ExpressContext) {
    try {
      const users = await userService.getUser(req.params);
      return sendSuccess(res, null, null, users);
    } catch (err) {
      next(err);
    }
  }

  async updateUser({ req, res, next }: ExpressContext) {
    try {
      const updatedUser = await userService.updateUser(req.params, req.body);
      return sendSuccess(res, "updated successfull", null, updatedUser);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser({ req, res, next }: ExpressContext) {
    try {
      const deletedUser = await userService.deleteUser(req.params);
      return sendSuccess(res, "deleted successfull", null, deletedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
