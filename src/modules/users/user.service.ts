import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AppDataSource } from "../../config/databaseConfig";
import { instanceToPlain } from "class-transformer";
import { UpdateUserDto } from "./dto/user.userUpdateDto";
import { NotFoundError } from "../../exception/baseError";

class UserService {
  userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getUser(id: any) {
    const filter = {} as any;
    if (id) filter.id = id;

    const users = await this.userRepository.find({
      where: filter,
    });

    return instanceToPlain(users);
  }

async updateUser(id: string, input: UpdateUserDto) {
  const result = await this.userRepository.update({ id }, input);

  if (result.affected === 0) {
    throw new NotFoundError("User not found or update failed");
  }

  const updatedUser = await this.userRepository.findOneBy({ id });
  return updatedUser;
}


  async deleteUser(id: any) {
    const deletedUser = await this.userRepository.delete({ id: id });
    if (!deletedUser)
      throw new NotFoundError("user not found, invalid user Id");
    return deletedUser;
  }//TODO delete user last test postman
}

export default new UserService()