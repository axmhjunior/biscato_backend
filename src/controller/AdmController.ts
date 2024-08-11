import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../database";
import { encryptPassword } from "../utils/Bcrypt";
import { CreateAdmInputDTO, UpdateAdmInputDTO } from "../dtos/adm.dto";
import { AdmService } from "../service/adm.service";
import { decodeToken } from "../utils/Jwt";

export class AdmController {
  private admService = new AdmService();
  async create(request: Request, response: Response) {
    try {
      const input = CreateAdmInputDTO.parse(request.body);
      const createAdm = await this.admService.create(input);
      return response.status(201).json(createAdm);
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
      const input = UpdateAdmInputDTO.parse(request.body);
      const updateAdm = await this.admService.update(id, input);
      return response.status(200).json(updateAdm);
    } catch (error) {
      return response.json(error);
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      await this.admService.delete(id);
      return response.status(200).send({});
    } catch (error) {
      return response.json(error);
    }
  }
}
