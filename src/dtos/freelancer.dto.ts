import { z } from "zod";

const FreelancerInputDTO = z.object({
  name: z.string(),
  documentType: z.string(),
  documentId: z.string(),
  serviceCategory: z.string(),
  description: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
  password: z.string(),
});

export type FreelancerInputDTO = z.infer<typeof FreelancerInputDTO>;

const UpdateFreelancerInputDTO = z.object({
  name: z.string().optional(),
  documentType: z.string().optional(),
  documentId: z.string().optional(),
  serviceCategory: z.string().optional(),
  description: z.string().optional(),
  phone: z.string().regex(/^8[2-7]\d{7}/).optional(),
  password: z.string().optional(),
});

export type UpdateFreelancerInputDTO = z.infer<typeof UpdateFreelancerInputDTO>;

export const FreelancerOutputDTO = z.object({
  name: z.string(),
  documentType: z.string(),
  documentId: z.string(),
  serviceCategory: z.string(),
  description: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
});

export type FreelancerOutputDTO = z.infer<typeof FreelancerOutputDTO>;
