"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/getCurrentUser";

const UserMenu = () => {
  const user = useCurrentUser();

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
            <Link href="/settings" className="flex">
              {" "}
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut()}
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
