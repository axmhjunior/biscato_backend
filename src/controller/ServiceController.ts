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

    try {

      console.log("cygsdc7suhx8wshx8ishwcx8s")
        const freelancer: object = await db.$queryRaw`
      SELECT latitude, longitude, userId,
        (6371 * acos(
          cos(radians(${latitude})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${longitude})) +
          sin(radians(${latitude})) * sin(radians(latitude))
        )) AS distance
      FROM freelancer_location
        HAVING distance <= 1000
      ORDER BY distance
    `;

console.log(freelancer.map((e) => e.userId), userId)

    const sendNotification = await db.serviceNotification.createMany({
      data: freelancer.map((e) => ({
        freelancerId: e.userId,
        clientId: userId,
        description,
        categoryId: categoryService,
      })),
    });
    return response.status(201).json(sendNotification);

    } catch (error) {
      console.log(error)
      return response.status(404).json({error});
    }

    
  
  }




  async checkJob(request: Request, response: Response) {

    const jobId = request.params.id;
    const statusSchema = z.object({
      status: z.boolean(),

    });

    const { status } =
      statusSchema.parse(request.body);
    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");
    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const freelancerId = decodeToken(token);

    const user = await db.user.findUnique({
      where: {
        id: freelancerId,
      },
    });

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }

    const statusJob = db.serviceNotification.update({
      where: {
        id: jobId
      },

      data: {
        status: false
      }
    });

    await db.serviceNotification.delete({
      where: {
        id: jobId
      }
    });

    return response.status(200).send(statusJob)

  }
}
