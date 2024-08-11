import { Request, Response } from "express";
import { z } from "zod";
import { decodeToken } from "../utils/Jwt";
import { db } from "../database";
import { SendFeedbackInputDTO } from "../dtos/feedback.dto";
import { FeedbackService } from "../service/feedback.service";

export class FeedbackController {
  private feedbackService = new FeedbackService();
  async create(request: Request, response: Response) {
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

    try {
      const input = SendFeedbackInputDTO.parse(request.body);
      await this.feedbackService.send(userId, input);
      response.status(201).send("Feedback sent");
    } catch (error) {
      response.json(error);
    }
  }

  // async delete(request: Request, response: Response) {
  //   const [, token] = z
  //     .string()
  //     .parse(request.headers.authorization)
  //     .split(" ");

  //   if (!token) {
  //     return response
  //       .status(401)
  //       .send({ error: "Access denied. No token provided." });
  //   }

  //   const feedbackId = request.params.id;

  //   const userId = decodeToken(token);
  //   const feedback = await db.feedback.findFirst({
  //     where: {
  //       userId,
  //       id: feedbackId,
  //     },
  //   });

  //   if (!feedback) {
  //     return response.status(404).send("User not found");
  //   }

  //   await db.feedback.delete({
  //     where: {
  //       id: feedbackId,
  //     },
  //   });

  //   return response.status(200).send({});
  // }
}
