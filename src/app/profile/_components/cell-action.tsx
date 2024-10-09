"use client";

import React, { useState } from "react";
import { AppliedJobColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import AlertModal from "@/components/modals/alertModal";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { deleteCompanyActionConfirm } from "@/actions/actions";

interface CellActionProps {
  data: AppliedJobColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/talent/jobs/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View job
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
