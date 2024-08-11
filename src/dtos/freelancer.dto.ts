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

const FreelancerOutputDTO = z.object({
  name: z.string(),
  documentType: z.string(),
  documentId: z.string(),
  serviceCategory: z.string(),
  description: z.string(),
  phone: z.string().regex(/^8[2-7]\d{7}/),
});

export type FreelancerOutputDTO = z.infer<typeof FreelancerOutputDTO>;
