import { z } from "zod";

export const UpdateRoleSchema = z.object({
  role: z.enum(["RECRUITER", "TALENT"], {
    required_error: "You need to select a role.",
  }),
});
export type UpdateRoleValues = z.infer<typeof UpdateRoleSchema>;

export const CompanySchema = z.object({
  name: z.string().min(1, "Minimum of one character allowed"),
  about: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  logoUrl: z.string(),
});
export type CompanyValues = z.infer<typeof CompanySchema>;
