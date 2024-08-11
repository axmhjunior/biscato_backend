import { z } from "zod";
import { db } from "../database";
import { Request, Response } from "express";
import { bcryptComparePassword } from "../utils/Bcrypt";
import { generateToken } from "../utils/Jwt";
import { AuthService } from "../service/auth.service";
import { LoginInputDTO } from "../dtos/login.dto";

export class AuthController {
  private authService = new AuthService();
  async login(request: Request, response: Response) {
    try {
      const input = LoginInputDTO.parse(request.body);
      const login = await this.authService.login(input);
      return response.status(200).json(login);
    } catch (error) {
      return response.json(error);
    }
  }

  // async authOtp(request: Request, response: Response) {
  //   const userSchema = z.object({
  //     otp: z.number(),
  //     phone: z.string(),
  //   });

  //   const { otp, phone } = userSchema.parse(request.body);

  //   const user = db.user.findUnique({
  //     where: {
  //       phone,
  //     },
  //   });

  //   if (!user) {
  //     return response.status(404).send({ error: "User not found" });
  //   }

  //   const verifyuser = await db.user.update({
  //     where: {
  //       phone,
  //     },
  //     data: {
  //       verified: true,
  //     },
  //   });

  //   return response.status(200).send(verifyuser);
  // }
}
