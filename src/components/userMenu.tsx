"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, Building, LogOut, User } from "lucide-react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

const UserMenu = () => {
  const user = useCurrentUser();

  const queryClient = useQueryClient();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-slate-100">
              <FaUser className="" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-60" align="end">
          <div className="my-2 p-2">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs">{user?.email}</p>
          </div>
          <Separator className="mb-2" />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="flex">
              {" "}
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>

          <div className="md:hidden">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/recruiter/company" className="flex">
                {" "}
                <Building className="h-4 w-4 mr-2" />
                Companies
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/recruiter/job" className="flex">
                {" "}
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
            className="cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
