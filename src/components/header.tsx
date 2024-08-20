import { Briefcase, Building, Loader, LogIn, NotebookPen } from "lucide-react";
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
              <Link href="/company">
                <Button variant="outline" className="flex gap-2">
                  <Building className="shrink-0 h-4 w-4" /> Companies
                </Button>
              </Link>
              <Link href="/createjob">
                <Button variant="theme" className="flex gap-2">
                  <Briefcase className="shrink-0 h-4 w-4" /> Jobs
                </Button>
              </Link>
            </>
          )}

          {user ? (
            <UserMenu />
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="flex gap-2">
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
