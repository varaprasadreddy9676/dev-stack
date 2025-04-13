
import * as z from "zod";

export const troubleshootingSchema = z.object({
  issue: z.string().min(5, "Issue title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  symptoms: z.array(z.string().min(3, "Symptom must be at least 3 characters")).min(1, "Add at least one symptom"),
  tags: z.array(z.string()),
  solutions: z.array(z.object({
    steps: z.string().min(10, "Solution steps must be at least 10 characters"),
    code: z.string(),
  })).min(1, "Add at least one solution"),
});

export type TroubleshootingFormValues = z.infer<typeof troubleshootingSchema>;
