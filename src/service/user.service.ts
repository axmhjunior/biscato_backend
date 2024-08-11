import {
  CreateUserInputDTO,
  UpdateUserInputDTO,
  UserOutputDTO,
} from "../dtos/user.dto";
import { UserRepository } from "../repository/user.repository";
import { encryptPassword } from "../utils/Bcrypt";
import { generateToken } from "../utils/Jwt";
import { otpGenerator } from "../utils/OtpGenerator";

export class UserService {
  userRepository = new UserRepository();
  async create(data: CreateUserInputDTO) {
  
    const userName = await this.userRepository.findUserByName(data.name);

    if (userName) {
      return "Username already exits";
    }

    const userPhone = await this.userRepository.findUserByPhone(data.phone);

    if (userPhone) {
      return "Phone already exits";
    }

    const encryptedPassword = await encryptPassword(data.password);

    data.password.replace(data.password, encryptedPassword);
    console.log("data:", data);
    const saveuser = await this.userRepository.save(data);

    const otp = otpGenerator();

    // messageService(`This your otp code: \n${otp}`, phone)

    const token = generateToken(saveuser.id);

    return { user: UserOutputDTO.parse(saveuser), token: token };
  }
  async update(id: string, data: UpdateUserInputDTO) {
    const userId = await this.userRepository.findUserById(id);

    if (!userId) {
      return "User not found";
    }

    let user: object | null;

    if (data.name) {
      user = await this.userRepository.findUserByName(data.name);

      if (user) {
        return "Username already exits";
      }
    }

    if (data.phone) {
      user = await this.userRepository.findUserByPhone(data.phone);

      if (user) {
        return "Phone already exits";
      }
    }

    let encryptedPassword: string | undefined;

    if (data.password) {
      encryptedPassword = await encryptPassword(data.password);
    }

    const updateuser = await this.userRepository.updateById(id, data);

    return UserOutputDTO.parse(updateuser);
  }

  async delete(id: string) {
    const userId = this.userRepository.findUserById(id);

    if (!userId) {
      return "User not found";
    }

    return await this.userRepository.remove(id);
  }
}
