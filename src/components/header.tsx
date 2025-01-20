"use client";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Check,
  ChevronsUpDown,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const links = [
  {
    value: "companies",
    label: "Companies",
    href: "/recruiter/company",
  },
  {
    value: "jobs",
    label: "Jobs",
    href: "/recruiter/job",
  },
];
const Header = () => {
  const user = useCurrentUser();
  const pathName = usePathname();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
              <div className="hidden md:flex gap-4">
                <Link href="/recruiter/company">
                  <Button
                    variant="secondary"
                    className="flex gap-2 drop-shadow"
                  >
                    <Building className="shrink-0 h-4 w-4" /> Companies
                  </Button>
                </Link>
                <Link href="/recruiter/job">
                  <Button variant="theme" className="flex gap-2 drop-shadow">
                    <Briefcase className="shrink-0 h-4 w-4" /> Jobs
                  </Button>
                </Link>
              </div>

              <div className="md:hidden">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? links.find((link) => link.value === value)?.label
                        : "Recruiters Link..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {links.map((link) => (
                            <CommandItem
                              key={link.value}
                              value={link.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                              onClick={() => {
                                router.push(link.href);
                              }}
                            >
                              {link.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === link.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
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
