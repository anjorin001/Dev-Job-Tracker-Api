import { Router } from "express";
import { validateDto } from "../../util/validateDto";
import { RegisterDto } from "./dto/register-user.dto";
import authControllers from "./auth.controllers";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { authMiddleware } from "../../middleware/authMiddleware";

const authRouter = Router();
authRouter.post("/register", validateDto(RegisterDto), authControllers.signup);
authRouter.post("/login", validateDto(LoginDto), authControllers.login);

authRouter.post(
  "/change-password",
  authMiddleware,
  validateDto(ChangePasswordDto),
  authControllers.changePassword
);
// forgot password
export default authRouter;
