import { SendFeedbackInputDTO } from "../dtos/feedback.dto";
import { FeedbackRepository } from "../repository/feedback.repository";
import { UserRepository } from "../repository/user.repository";

export class FeedbackService {
  private feedbackRepository = new FeedbackRepository();
  private userRepository = new UserRepository();

  async send(id: string, data: SendFeedbackInputDTO) {
    const userId = await this.userRepository.findUserById(id);

    if (!userId) {
      return "User not found";
    }

    return await this.feedbackRepository.save(id, data);
  }
}
