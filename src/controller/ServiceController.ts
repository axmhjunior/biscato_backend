import { Request, Response } from "express";
import { z } from "zod";
import { decodeToken } from "../utils/Jwt";
import { db } from "../database";


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
      latitude: z.number(),
      longitude: z.number(),
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



    const freelancer = await db.$queryRaw`
      SELECT latitude, longitude,
        (6371 * acos(
          cos(radians(${latitude})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${longitude})) +
          sin(radians(${latitude})) * sin(radians(latitude))
        )) AS distance
      FROM freelancer_location
        HAVING distance <= 2 
      ORDER BY distance
    `;



    response.status(201).json(freelancer);
  }
}
