"use client";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { Briefcase, Building, LogIn, User } from "lucide-react";
import Link from "next/link";

export default function FooterLinks() {
  const user = useCurrentUser();
  return (
    <>
      {!user && (
        <div>
          <h3 className="text-gray-100 font-bold  text-xl">Links</h3>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-gray-100"
          >
            <LogIn className="size-4" /> Login/SignUp
          </Link>
          <Link href="/jobs" className="flex items-center gap-2 text-gray-100">
            <Briefcase className="size-4" /> Jobs
          </Link>
        </div>
      )}
      {user?.role === "RECRUITER" && (
        <div>
          <h3 className="text-gray-100 font-bold  text-xl">Links</h3>
          <Link
            href="/recruiter/company"
            className="flex items-center gap-2 text-gray-100"
          >
            <Building className="size-4" /> Companies
          </Link>
          <Link href="/jobs" className="flex items-center gap-2 text-gray-100">
            <Briefcase className="size-4" /> Jobs
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-gray-100"
          >
            <User className="size-4" /> Profile
          </Link>
        </div>
      )}
      {user?.role === "TALENT" && (
        <div>
          <h3 className="text-gray-100 font-bold  text-xl">Links</h3>

          <Link href="/jobs" className="flex items-center gap-2 text-gray-100">
            <Briefcase className="size-4" /> Jobs
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-gray-100"
          >
            <User className="size-4" /> Profile
          </Link>
        </div>
      )}
    </>
  );
}
