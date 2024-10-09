import { z } from "zod";

export const UpdateRoleSchema = z.object({
  role: z.enum(["RECRUITER", "TALENT"], {
    required_error: "You need to select a role.",
  }),
});
export type UpdateRoleValues = z.infer<typeof UpdateRoleSchema>;

export const UpdateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  bio: z.string().optional(),
  resumeUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});
export type UpdateUserValues = z.infer<typeof UpdateUserSchema>;

export const CompanySchema = z.object({
  name: z.string().min(1, "Minimum of one character allowed"),
  about: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  logoUrl: z.string(),
});
export type CompanyValues = z.infer<typeof CompanySchema>;

export const JobSchema = z.object({
  title: z.string().min(1, "Minimum of one character allowed"),
  companyId: z.string(),
  description: z.string(),
  requirement: z.string(),
  salary: z.coerce.number().min(1),
  location: z.string(),
  position: z.coerce.number().min(1),
  jobType: z.string(),
  experienceLevel: z.coerce.number().min(1),
});
export type JobValues = z.infer<typeof JobSchema>;
