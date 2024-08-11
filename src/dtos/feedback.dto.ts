import { z } from "zod";

export const SendFeedbackInputDTO = z.object({
  text: z.string(),
});

export type SendFeedbackInputDTO = z.infer<typeof SendFeedbackInputDTO>;
