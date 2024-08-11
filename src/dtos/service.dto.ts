import { z } from "zod";

export const ServiceInputDTO = z.object({
  description: z.string(),
  categoryService: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type ServiceInputDTO = z.infer<typeof ServiceInputDTO>;

export const ServiceOutputDTO = z.object({
  description: z.string(),
  categoryService: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type ServiceOutputDTO = z.infer<typeof ServiceOutputDTO>;
