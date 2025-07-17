import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../util/responseHandler";
import AuthService from "./auth.service";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signup(req.body);
      return sendSuccess(res, "user created succefully", 201, { result });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return sendSuccess(res, "user created succefully", 200, { result });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
