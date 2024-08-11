import { FreelancerInputDTO, FreelancerOutputDTO, UpdateFreelancerInputDTO } from "../dtos/freelancer.dto";
import {
    CreateUserInputDTO,
    UpdateUserInputDTO,
    UserOutputDTO,
  } from "../dtos/user.dto";
import { FreelancerRepository } from "../repository/freelancer.repository";
  import { UserRepository } from "../repository/user.repository";
  import { encryptPassword } from "../utils/Bcrypt";
  import { generateToken } from "../utils/Jwt";
  import { otpGenerator } from "../utils/OtpGenerator";
  
  export class UserService {
    private freelancerRepository = new FreelancerRepository()
    userRepository = new UserRepository();
    async create(data: FreelancerInputDTO) {
    
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
      const saveAsFreelancer = await this.freelancerRepository.save(saveuser.id, data);
  
  
      const otp = otpGenerator();
  
      // messageService(`This your otp code: \n${otp}`, phone)
  
      const token = generateToken(saveuser.id);
  
      return { user: UserOutputDTO.parse(saveuser), token: token };
    }
    async update(id: string, data: UpdateFreelancerInputDTO) {
      const userId = await this.freelancerRepository.findFreelancerById(id);
  
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
  
      const updateuser = await this.freelancerRepository.updateById(id, data);
  
      return FreelancerOutputDTO.parse(updateuser);
    }
  
    async delete(id: string) {
      const userId = this.freelancerRepository.findFreelancerById(id);
  
      if (!userId) {
        return "User not found";
      }
  
      return await this.freelancerRepository.remove(id);
    }
  }
  