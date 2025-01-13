import { UserRole } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

export interface Company {
  name: string;
  logoUrl: string;
  location: string | null;
}
export interface Job {
  id: string;
  title: string;
  summary: string;
  content: string;
  position: number;
  jobType: string;
  experienceLevel: number;
  salary: number;
  location: string;
  applications: Application[];
  company: Company;
  createdAt: Date;
}

export interface Application {
  userId: string;
  jobId: string;
}

export interface JobPage {
  jobs: Job[];
  nextCursor: string | null;
}

export interface ApplicationInfo {
  hasUserApplied: boolean;
}

export interface CurrentUser {
  id?: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  bio: string;
  resumeUrl: string;
  githubUrl: string;
  websiteUrl: string;
}
