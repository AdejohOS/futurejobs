"use client";

import React, { useState } from "react";
import { JobColumn } from "./columns";
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
import { deleteJobActionConfirm } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: JobColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    await deleteJobActionConfirm(data.id);
    toast({
      title: "Job deleted successfully!",
    });
    try {
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            onClick={() => router.push(`/recruiter/job/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/recruiter/job/${data.id}/applications`)
            }
          >
            <Eye className="mr-2 h-4 w-4" /> Applicants
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
