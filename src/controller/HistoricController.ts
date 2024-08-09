import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../database";
import { decodeToken } from "../utils/Jwt";
import { error } from "console";

export class HistoricController {
    async show(request: Request, response: Response){
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

      const getAll = await db.historic.findMany({
        where: {
            OR: [
                {
                    clientId: userId
                },
                {
                    freelancerId: userId
                }
            ]
        }
      });

      return response.status(200).send(getAll)
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
      
      
      const userId = decodeToken(token);
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return response.status(404).send({ error: "User not found" });
      }

      const findHistoric = await db.historic.findFirst({
        where: {
            OR: [
                {
                    clientId: userId
                },
                {
                    freelancerId: userId
                }
            ]
        }
      });

      if(!findHistoric){
        return response.status(404).send({error: "Historic not found"})
      }

      await db.historic.delete({
        where: {
            id: findHistoric.id
        }
      })
    }
    
}