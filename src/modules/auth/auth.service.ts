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
class AuthService {
  private readonly userRepository: Repository<User>;
  async signup(input: RegisterDto) {
    const founduser = await this.userRepository.findOneBy({
      email: input.email,
    });
    if (founduser) throw new ConflictError("user already exist");
    const hashedPassword = await hashPassword(input.password);

    const newUser = await this.userRepository.create({
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
      founduser.password,
      input.password
    );

    if (!passwordMatch) throw new UnauthorizedError("invalid password");

    const token = await tokenGenerator(founduser);

    return token;
  }
}

export default new AuthService();
