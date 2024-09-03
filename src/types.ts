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
  description: string;
  position: number;
  jobType: string;
  experienceLevel: number;
  salary: number;
  location: string;
  company: Company;
  createdAt: Date;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
}

export interface JobPage {
  jobs: Job[];
  nextCursor: string | null;
}
