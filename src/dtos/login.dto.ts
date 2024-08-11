import { z } from "zod";

export const LoginInputDTO = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type LoginInputDTO = z.infer<typeof LoginInputDTO>;

export const LoginOutputDTO = z.object({
  identifier: z.string(),
});

export type LoginOutputDTO = z.infer<typeof LoginOutputDTO>;
