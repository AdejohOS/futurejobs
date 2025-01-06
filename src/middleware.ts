import authConfig from "./auth.Config";
import NextAuth from "next-auth";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  recruiterPrefix,
  talentPrefix,
  apiFetchPrefix,
  freeJobsPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isApiFetchRoute = nextUrl.pathname.startsWith(apiFetchPrefix);
  const isFreeJobRoute = nextUrl.pathname.startsWith(freeJobsPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isRecruiterRoute = nextUrl.pathname.startsWith(recruiterPrefix);
  const isTalentRoute = nextUrl.pathname.startsWith(talentPrefix);

  //providers
  if (isApiAuthRoute) {
    return;
  }

  if (isApiFetchRoute) {
    return;
  }

  if (isFreeJobRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isRecruiterRoute) {
    if (req.auth?.user.role !== "RECRUITER") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (isTalentRoute) {
    if (req.auth?.user.role !== "TALENT") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute && !freeJobsPrefix) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
