import { Router } from "express";
import { validateDto } from "../../util/validateDto";
import { RegisterDto } from "./dto/register-user.dto";
import authControllers from "./auth.controller";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { authMiddleware } from "../../middleware/authMiddleware";

const authRouter = Router();
authRouter.post("/register", validateDto(RegisterDto), authControllers.signup);
authRouter.post("/login", validateDto(LoginDto), authControllers.login);
// forgot password 
authRouter.get("/reset-password-token", authControllers.getForgotPasswordToken);
authRouter.post("/reset-password", authControllers.resetPassword);
// change password
authRouter.post(
  "/change-password",
  authMiddleware,
  validateDto(ChangePasswordDto),
  authControllers.changePassword
);
export default authRouter;
