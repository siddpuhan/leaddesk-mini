import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters"),
});

export const statusUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED"]),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type StatusUpdate = z.infer<typeof statusUpdateSchema>;