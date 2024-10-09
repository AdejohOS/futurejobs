import NextAuth from "next-auth";

import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import authConfig from "./auth.Config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // Block unverified user from logging in

      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.bio && session.user) {
        session.user.bio = token.bio as string;
      }
      if (token.resumeUrl && session.user) {
        session.user.resumeUrl = token.resumeUrl as string;
      }
      if (token.githubUrl && session.user) {
        session.user.githubUrl = token.githubUrl as string;
      }
      if (token.websiteUrl && session.user) {
        session.user.websiteUrl = token.websiteUrl as string;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.bio = existingUser.bio;
      token.resumeUrl = existingUser.resumeUrl;
      token.githubUrl = existingUser.githubUrl;
      token.websiteUrl = existingUser.websiteUrl;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
