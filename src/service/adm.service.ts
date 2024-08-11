import {
  AdmOutputDTO,
  CreateAdmInputDTO,
  UpdateAdmInputDTO,
} from "../dtos/adm.dto";
import { AdmRepository } from "../repository/adm.repository";
import { UserRepository } from "../repository/user.repository";
import { encryptPassword } from "../utils/Bcrypt";
import { generateToken } from "../utils/Jwt";
import { otpGenerator } from "../utils/OtpGenerator";

export class AdmService {
  private admRepository = new AdmRepository();
  private userRepository = new UserRepository();

  async create(data: CreateAdmInputDTO) {
    console.log("first");
    const userName = await this.userRepository.findUserByName(data.name);
    console.log("second");
    if (userName) {
      return "Username already exits";
    }

    const userEmail = await this.admRepository.findAdmByEmail(data.email);

    if (userEmail) {
      return "Email already exits";
    }

    const userPhone = await this.userRepository.findUserByPhone(data.phone);

    if (userPhone) {
      return "Phone already exits";
    }

    const encryptedPassword = await encryptPassword(data.password);

    data.password.replace(data.password, encryptedPassword);
    console.log("data:", data);
    const saveUser = await this.userRepository.save(data);

    const saveAsAdm = await this.admRepository.save(saveUser.id, data.email);
    const otp = otpGenerator();

    // messageService(`This your otp code: \n${otp}`, phone)

    const token = generateToken(saveUser.id);

    return { user: AdmOutputDTO.parse(data), token: token };
  }

  async update(id: string, data: UpdateAdmInputDTO) {
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
    if (data.email) {
      user = await this.admRepository.findAdmByEmail(data.name);

      if (user) {
        return "Email already exits";
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

    const updateuser = await this.admRepository.updateById(id, data);

    return AdmOutputDTO.parse(updateuser);
  }
  async delete(id: string) {
    const userId = this.userRepository.findUserById(id);

    if (!userId) {
      return "User not found";
    }

    return await this.admRepository.remove(id);
  }
}
