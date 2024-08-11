import { db } from "../database";
import { SendFeedbackInputDTO } from "../dtos/feedback.dto";

export class FeedbackRepository{
    async save(id:string, data: SendFeedbackInputDTO) {
        return await db.feedback.create({
          data: {
            userId: id,
            text: data.text
          }
        });
      }
}