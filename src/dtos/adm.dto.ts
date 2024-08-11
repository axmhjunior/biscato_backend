import { z } from "zod";

export const CreateAdmInputDTO = z.object({
  name: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
  email: z.string().email(),
  password: z.string(),
});

export type CreateAdmInputDTO = z.infer<typeof CreateAdmInputDTO>;

export const UpdateAdmInputDTO = z.object({
  name: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
  email: z.string().email(),
  password: z.string(),
});

export type UpdateAdmInputDTO = z.infer<typeof UpdateAdmInputDTO>;

export const AdmOutputDTO = z.object({
  name: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
  email: z.string().email(),
});

export type AdmOutputDTO = z.infer<typeof AdmOutputDTO>;
