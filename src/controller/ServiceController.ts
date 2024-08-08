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
      latitude: z.string(),
      longitude: z.string()
    });

    const { description, categoryService, longitude, latitude } =
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
        categoryId: categoryService
      },
    });

    const freelancers = await db.$queryRaw`
      SELECT userId, name, latitude, longitude,
      (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude)) - radians(${longitude}) + sin(radians(${latitude})) AS distance

      FROM freelancerLocation HAVING distance <= 2
      ORDER BY distance
    
    ))
    `

    



    return response.status(201).send(freelancers);
  }
}
