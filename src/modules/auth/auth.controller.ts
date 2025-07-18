import { sendSuccess } from "../../util/responseHandler";
import AuthService from "./auth.service";
import { Request, Response, NextFunction } from "express";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signup(req.body);
      return sendSuccess(res, "user created successfully", 201, { result });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.login(req.body);
      return sendSuccess(res, "user created successfully", 200, { token });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
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

  async getForgotPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = await AuthService.getForgotPasswordToken(req.body.email);
      return sendSuccess(res, "token retrieved succefully", 200, { token });
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.resetPassword(req.body); //token, newPassword
      return sendSuccess(res, "password changed succefully", 200);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
