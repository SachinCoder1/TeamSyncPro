import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.object({
    title: z.string(),
    sectionId: z.string()
  }),
  label: z.string(),
  priority: z.string(),
  done: z.boolean(),
  sectionStatus: z.string(),
  assignee: z.object({
    name: z.string(),
    id: z.string(),
    profileImage: z.optional(z.string()),
  }),
});

export type Task = z.infer<typeof taskSchema>;
