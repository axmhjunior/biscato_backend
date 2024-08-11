import { z } from "zod";

export const CreateUserInputDTO = z.object({
  name: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
  password: z.string(),
});

export type CreateUserInputDTO = z.infer<typeof CreateUserInputDTO>;

export const UpdateUserInputDTO = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .regex(/^8[2-7]\d{7}/)
    .optional(),
  password: z.string().optional(),
});

export type UpdateUserInputDTO = z.infer<typeof UpdateUserInputDTO>;

export const UserOutputDTO = z.object({
  name: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
}); 

export type UserOutputDTO = z.infer<typeof UserOutputDTO>;
