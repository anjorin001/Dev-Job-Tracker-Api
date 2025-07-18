import { IsString } from "class-validator";
import { ForgetPasswordReset } from "./forgetPassword.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { AppDataSource } from "./../../config/databaseConfig";
import { RegisterDto } from "./dto/register-user.dto";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../exception/baseError";
import { comparePassword, hashPassword } from "../../helper/passwordChecker";
import { LoginDto } from "./dto/login.dto";
import { tokenGenerator } from "../../helper/tokenGenerator";
import { randomBytes } from "crypto";
class AuthService {
  private readonly userRepository: Repository<User>;
  private readonly fpRepository: Repository<ForgetPasswordReset>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.fpRepository = AppDataSource.getRepository(ForgetPasswordReset);
  }

  async signup(input: RegisterDto) {
    const founduser = await this.userRepository.findOneBy({
      email: input.email,
    });
    if (founduser) throw new ConflictError("user already exist");
    const hashedPassword = await hashPassword(input.password);

    const newUser = await this.userRepository.save({
      ...input,
      password: hashedPassword,
    });
    const { password, ...userInfo } = newUser;
    return userInfo;
  }

  async login(input: LoginDto) {
    const founduser = await this.userRepository.findOneBy({
      email: input.email,
    });

    if (!founduser) throw new UnauthorizedError("email does not exist");

    const passwordMatch = await comparePassword(
      input.password,
      founduser.password,
    );

    if (!passwordMatch) throw new UnauthorizedError("invalid password");

    const token = await tokenGenerator(founduser);

    return token;
  }

  async changePassword(userId: string, { newPassword, oldPassword }) {
    const founduser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!founduser) throw new UnauthorizedError("email does not exist");

    const passwordMatch = await comparePassword(
      oldPassword,
      founduser.password,
    );

    if (!passwordMatch) throw new UnauthorizedError("invalid password");

    const hashedNewPassword = await hashPassword(newPassword);
    const changePassword = await this.userRepository.update(
      { id: userId },
      { password: hashedNewPassword }
    );

    return true;
  }

  async getForgotPasswordToken(email: any) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedError("user doesnt exist");

    const fpToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 mins

    const saveToken = this.fpRepository.create({
      token: fpToken,
      user,
      expiresAt,
    });

    await this.fpRepository.save(saveToken);
    return fpToken;
  }

  async resetPassword(input: any) {
    const savedRepoToken = await this.fpRepository.findOne({
      where: { token: input.token },
      relations: ["user"],
    });

    if (!savedRepoToken) throw new UnauthorizedError("invalid token");

    if (savedRepoToken.expiresAt < new Date()) {
      throw new UnauthorizedError("expired token");
    }

    const hashedPassword = await hashPassword(input.newPassword);
    savedRepoToken.user.password = hashedPassword;
    this.userRepository.save(savedRepoToken.user);

    return true;
  }
}

export default new AuthService();
