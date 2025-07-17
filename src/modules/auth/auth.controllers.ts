import { sendSuccess } from "../../util/responseHandler";
import AuthService from "./auth.service";
import { ExpressContext } from "../../util/ExpressContext";

class AuthController {
  async signup({ req, res, next }: ExpressContext) {
    try {
      const result = await AuthService.signup(req.body);
      return sendSuccess(res, "user created succefully", 201, { result });
    } catch (err) {
      next(err);
    }
  }

  async login({ req, res, next }: ExpressContext) {
    try {
      const result = await AuthService.login(req.body);
      return sendSuccess(res, "user created succefully", 200, { result });
    } catch (err) {
      next(err);
    }
  }

  async changePassword({ req, res, next }: ExpressContext) {
    try {
      // const result = await AuthService.login(req.body);
      // return sendSuccess(res, "user created succefully", 200, { result });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
