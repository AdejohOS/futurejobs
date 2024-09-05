import {
  Briefcase,
  Building,
  Loader,
  LogIn,
  NotebookPen,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import UserMenu from "./userMenu";
import { currentUser } from "@/lib/auth";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="bg-sky-50 h-16 px-4 drop-shadow">
      <div className="container flex items-center w-full h-full justify-between mx-auto">
        <Link href="/" className="text-2xl font-semibold text-sky-600">
          FutureJobs
        </Link>
        <div className="flex items-center gap-4">
          {user?.role === "RECRUITER" && (
            <>
              <Link href="/recruiter/company">
                <Button variant="secondary" className="flex gap-2 drop-shadow">
                  <Building className="shrink-0 h-4 w-4" /> Companies
                </Button>
              </Link>
              <Link href="/recruiter/job">
                <Button variant="theme" className="flex gap-2 drop-shadow">
                  <Briefcase className="shrink-0 h-4 w-4" /> Jobs
                </Button>
              </Link>
            </>
          )}
          {user?.role === "TALENT" && (
            <>
              <Link href="/talent/profile">
                <Button variant="secondary" className="flex gap-2 drop-shadow">
                  <User className="shrink-0 h-4 w-4" /> Profile
                </Button>
              </Link>
              <Link href="/talent/jobs">
                <Button variant="theme" className="flex gap-2 drop-shadow">
                  <Briefcase className="shrink-0 h-4 w-4" /> Jobs
                </Button>
              </Link>
            </>
          )}

          {user ? (
            <UserMenu />
          ) : (
            <Link href="/auth/login">
              <Button variant="secondary" className="flex gap-2 drop-shadow">
                <LogIn className="shrink-0 h-4 w-4" /> Signin / Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
