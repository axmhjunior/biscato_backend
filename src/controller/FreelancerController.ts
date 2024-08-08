import { Request, Response } from "express";
import { otpGenerator } from "../utils/OtpGenerator";
import { z } from "zod";
import { db } from "../database";
import { encryptPassword } from "../utils/Bcrypt";
import { messageService } from "../utils/twilio";
import { decodeToken } from "../utils/Jwt";

export class FreelancerController {
  async create(request: Request, response: Response) {
    const freelancerSchema = z.object({
      name: z.string(),
      documentType: z.string(),
      documentId: z.string(),
      serviceCategory: z.string(),
      description: z.string(),
      phone: z.string().regex(/^8[2-7]\d{7}/),
      password: z.string(),
    });

    const {
      name,
      phone,
      password,
      documentType,
      documentId,
      serviceCategory,
      description,
    } = freelancerSchema.parse(request.body);

    // check if client already exits
    const userName = await db.user.findUnique({
      where: {
        name,
      },
    });

    if (userName) {
      return response.status(409).send("Username already exits");
    }

    const userPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });

    if (userPhone) {
      return response.status(409).send("Phone already exits");
    }

    const encryptedPassword = await encryptPassword(password);

    const saveUser = await db.user.create({
      data: {
        name,
        phone,
        password: encryptedPassword,
      },
    });

    const saveFreelancer = await db.freelancer.create({
      data: {
        userId: saveUser.id,
        documentType,
        documentId,
        serviceCategory,
        rating: 0,
        description,
      },
    });

    const otp = otpGenerator();

    // messageService(`O seu codigo de confirmacão é \n${otp}`, phone)
    console.log(otp);
    return response.status(201).send(saveFreelancer);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;

    const freelancerSchema = z.object({
      name: z.string().optional(),
      serviceCategory: z.string().optional(),
      description: z.string().optional(),
      phone: z
        .string()
        .regex(/^8[2-7]\d{7}/)
        .optional(),
      password: z.string().optional(),
    });

    const { name, phone, password, serviceCategory, description } =
      freelancerSchema.parse(request.body);

    // check id
    const userId = db.user.findUnique({
      where: {
        id,
      },
    });

    if (!userId) {
      return response.status(404).send("User not found");
    }

    let user: object | null;

    if (name) {
      user = await db.user.findUnique({
        where: {
          name,
        },
      });

      if (user) {
        return response.status(409).send("Username already exits");
      }
    }

    if (phone) {
      user = await db.user.findUnique({
        where: {
          phone,
        },
      });

      if (user) {
        return response.status(409).send("Phone already exits");
      }
    }
    let encryptedPassword: string | undefined;

    if (password) {
      encryptedPassword = await encryptPassword(password);
    }

    const updateFreelancer = await db.freelancer.update({
      where: {
        userId: id,
      },
      data: {
        serviceCategory,
        description,
      },
    });

    return response.status(200).send(updateFreelancer);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    // check id
    const userId = db.user.findUnique({
      where: {
        id,
      },
    });

    if (!userId) {
      return response.status(404).send("User not found");
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    await db.freelancer.delete({
      where: {
        userId: id,
      },
    });

    return response.status(200).send({});
  }

  async location(request: Request, response: Response) {
    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");
    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }
    const freelancerSchema = z.object({
      latitude: z.number(),
      longitude: z.number(),
    });

    const userId = decodeToken(token);

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }

    const { longitude, latitude } = freelancerSchema.parse(request.body);

    const getLocation = db.freelancerLocation.create({
        data: {
            userId: userId,
            latitude,
            longitude
            
        }
    });

    return response.status(201).send(getLocation)
  }


  async notification(request: Request, response: Response) {

    const [, token] = z
      .string()
      .parse(request.headers.authorization)
      .split(" ");
    if (!token) {
      return response
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }


    const userId = decodeToken(token);

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }
        const notification = db.serviceNotification.findMany({
            where: {
                freelancerId: userId
            }
        });

        return response.status(200).send(notification);
  }
}
