"use client";

import React, { useState } from "react";
import { JobApplicationColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal, X } from "lucide-react";
import AlertModal from "@/components/modals/alertModal";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  deleteCompanyActionConfirm,
  handleApplicationAction,
} from "@/actions/actions";
import { UpdateJobApplicationValues } from "@/lib/zodValidation";

interface CellActionProps {
  data: JobApplicationColumn;
  jobId: string;
  userId: string;
  currentStatus?: "APPROVED" | "REJECTED";
}

export const CellAction = ({
  data,
  jobId,
  userId,
  currentStatus,
}: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState(currentStatus);

  const handleApplication = async (status: "APPROVED" | "REJECTED") => {
    try {
      await handleApplicationAction(userId, jobId, status);
      toast({
        title: `Application status ${status}!`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleApplication("APPROVED")}>
            <Check className="mr-2 size-4" /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleApplication("REJECTED")}>
            <X className="mr-2 size-4" /> Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
