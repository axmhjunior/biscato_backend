import { Request, Response } from "express";
import { z } from "zod";
import { decodeToken } from "../utils/Jwt";
import { db } from "../database";

export class FeedbackController {
    async create(request: Request, response: Response){
        const [, token] = z
        .string()
        .parse(request.headers.authorization)
        .split(" ");


      if (!token) {
        return response
          .status(401)
          .send({ error: "Access denied. No token provided." });
      }
  
      const feedbackSchema = z.object({
        text: z.string(),
      });
  
      const { text} =
        feedbackSchema.parse(request.body);
      const userId = decodeToken(token);
  
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return response.status(404).send({ error: "User not found" });
      }

      const save = await db.feedback.create({
        data: {
            userId,
            text
        }
      });

      response.status(201).send("Feedback sent")
    }

    async delete(request: Request, response: Response){
        const [, token] = z
        .string()
        .parse(request.headers.authorization)
        .split(" ");


      if (!token) {
        return response
          .status(401)
          .send({ error: "Access denied. No token provided." });
      }

      const feedbackId = request.params.id

      const userId = db.feedback.findUnique({
        where: {
           userId:feedbackId
        }
    });

    if(!userId){
        return response.status(404).send('User not found');
    }
    
    await db.user.delete({
        where:{
           userId:feedbackId
        }
    });

    return response.status(200).send({})
    }
}