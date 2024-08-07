import { Request, Response } from "express";
import { z } from "zod";
import { decodeToken } from "../utils/Jwt";
import { db } from "../database";
import { error } from "console";

export class ServiceController {
  async requestService(request: Request, response: Response) {
    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");
    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const serviceSchema = z.object({
      description: z.string(),
      categoryService: z.string(),
      locationCenter: z.string(),
    });

    const { description, categoryService, locationCenter } =
      serviceSchema.parse(request.body);
    const userId = decodeToken(token);

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }

    const registerJob = await db.service.create({
      data: {
        description,
        clientId: userId,
        freelancerId:"4e52bc7c-0023-4c5d-9d49-223ee115db14",
        categoryId: categoryService,
        locationCenter,
      },
    });

    return response.status(201).send(registerJob);
  }
}
