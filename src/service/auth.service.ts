import { LoginInputDTO } from "../dtos/login.dto";
import { UserRepository } from "../repository/user.repository";
import { bcryptComparePassword } from "../utils/Bcrypt";
import { generateToken } from "../utils/Jwt";

export class AuthService{
    private userRepository = new UserRepository();
    
    async login(data: LoginInputDTO){

    
        const user = await this.userRepository.findUserByNameOrPhone(data.identifier)
    
        if (!user) {
          return "Identifier ou Password invalid.";
        }
    
        if (!(await bcryptComparePassword(data.password, user.password))) {
          return "Identifier ou Password invalid.";
        }
        const token = generateToken(user.id);
    
        const findUser = await this.userRepository.findUserById(user.id)
    
        if (findUser) {
        //   return { token: token, role: findUser.role };
          return { token: token};
        }
        // return { token: token, role: user.role };
        return { token: token };
    }
}