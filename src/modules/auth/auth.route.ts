import { Router } from "express";
import { validateDto } from "../../util/validateDto";
import { RegisterDto } from "./dto/register-user.dto";
import authControllers from "./auth.controllers";
import { LoginDto } from "./dto/login.dto";

const authRouter = Router();

authRouter.post("/register", validateDto(RegisterDto), authControllers.signup);
authRouter.post("/login", validateDto(LoginDto), authControllers.login);

export default authRouter;
