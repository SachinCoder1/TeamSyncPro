import { z } from "zod";

export const onboardSchema = z
  .object({
    project: z.string().min(1, "Project name is required"),
    tasks: z
      .array(z.string())
      .min(1, "At least one task is required")
      .max(3, "A maximum of 3 tasks are allowed"),
    description: z.string().min(10, "Description is too short"),
  })
  .partial(); // Use partial to allow stepwise validation
