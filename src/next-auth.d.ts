import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  bio: string;
  githubUrl: string;
  websiteUrl: string;
  resumeUrl: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
