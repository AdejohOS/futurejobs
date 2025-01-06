"use client";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Loader,
  LogIn,
  NotebookPen,
  SearchIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import UserMenu from "./userMenu";
import { currentUser } from "@/lib/auth";
import Logo from "./logo";

import { Input } from "./ui/input";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const user = useCurrentUser();
  const pathName = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);

    if (!searchQuery) return;
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <header className="bg-sky-50   py-3 drop-shadow">
      <div className="container flex items-center w-full h-full justify-between mx-auto gap-3">
        <Link href="/" className={cn(showFullWidthSearch && "hidden")}>
          <Logo />
        </Link>

        <>
          {pathName !== "/" && (
            <form
              action=""
              onSubmit={handleSubmit}
              className={cn(
                `md:flex flex-grow gap-4  hidden justify-center`,
                showFullWidthSearch && "flex"
              )}
            >
              {showFullWidthSearch && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full drop-shadow "
                  onClick={() => setShowFullWidthSearch(false)}
                >
                  <ArrowLeft className="size-4 shrink-0" />
                </Button>
              )}

              <div className="max-w-[500px] flex flex-grow">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none "
                  type="search"
                  placeholder="Search jobs..."
                  defaultValue={searchQuery}
                />
                <Button
                  type="submit"
                  variant="theme"
                  className="border-l-0 rounded-l-none"
                >
                  <SearchIcon className="text-white size-4" />
                </Button>
              </div>
            </form>
          )}
        </>

        <div
          className={cn(
            `flex items-center gap-4`,
            showFullWidthSearch && "hidden"
          )}
        >
          {pathName !== "/" && (
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full md:hidden drop-shadow"
              size="icon"
              onClick={() => setShowFullWidthSearch(true)}
            >
              <SearchIcon className=" size-4" />
            </Button>
          )}

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

          {user?.role !== "RECRUITER" && (
            <>
              <Link href="/jobs">
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
                <LogIn className="shrink-0 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
