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
      const newPassword = await AuthService.changePassword(
        req.user.userId,
        req.body
      );
      return sendSuccess(res, "password changed succefully", 200);
    } catch (err) {
      next(err);
    }
  }

  async getForgotPasswordToken({ req, res, next }: ExpressContext) {
    try {
      const fpToken = await AuthService.getForgotPasswordToken(req.body.email);
      return sendSuccess(res, "token retrieved succefully", 200, { fpToken });
    } catch (err) {
      next(err);
    }
  }

  async resetPassword({ req, res, next }: ExpressContext) {
    try {
      const result = await AuthService.resetPassword(req.body); //token, newPassword
      return sendSuccess(res, "password changed succefully", 200);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
