import { z } from "zod";

export const FeedbackInputDTO = z.object({
  text: z.string(),
});

export type FeedbackInputDTO = z.infer<typeof FeedbackInputDTO>;
