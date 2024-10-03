import { z } from "zod";

export const UpdateRoleSchema = z.object({
  role: z.enum(["RECRUITER", "TALENT"], {
    required_error: "You need to select a role.",
  }),
});

// Accept reject job application
export const UpdateJobApplicationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {}),
});
export type UpdateJobApplicationValues = z.infer<
  typeof UpdateJobApplicationSchema
>;

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
