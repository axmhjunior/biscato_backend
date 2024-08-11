import { Request, Response } from "express";
import { otpGenerator } from "../utils/OtpGenerator";
import { z } from "zod";
import { db } from "../database";
import { encryptPassword } from "../utils/Bcrypt";
import { messageService } from "../utils/twilio";
import { decodeToken, generateToken } from "../utils/Jwt";
import { UserService } from "../service/user.service";
import { CreateUserInputDTO, UpdateUserInputDTO } from "../dtos/user.dto";

export class UserController {
  userService = new UserService();
  async create(request: Request, response: Response) {
    try {
      console.log("cbdshcisjcoe");
      const input = CreateUserInputDTO.parse(request.body);
      console.log(input);
      const newUser = await this.userService.create(input);
      console.log("newUser");
      return response.status(201).json(newUser);
    } catch (error) {
      return response.json(error);
    }
  }

  async update(request: Request, response: Response) {
    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");
    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const id = decodeToken(token);
    try {
      const input = UpdateUserInputDTO.parse(request.body);
      const updateUser = await this.userService.update(id, input);
      return response.status(200).json(updateUser);
    } catch (error) {
      return response.json(error);
    }
  }

  async delete(request: Request, response: Response) {
    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");

    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const id = decodeToken(token);

    try {
      await this.userService.delete(id);
      return response.status(200).json();
    } catch (error) {
      return response.json(error);
    }
  }
}
