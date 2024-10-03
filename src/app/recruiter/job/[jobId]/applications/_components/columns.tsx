"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import Image from "next/image";
import { ColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type JobApplicationColumn = {
  id: string;
  createdAt: Date;
  applicantName: string | null;
  email: string | null;
  status: string;
  jobId: string;
  userId: string;
};

function statusToVariant(status: string) {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "destructive";
    case "PENDING":
    default:
      return "default";
  }
}

const columnHelper = createColumnHelper();

export const columns: ColumnDef<JobApplicationColumn>[] = [
  {
    accessorKey: "applicantName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant Name:
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "resume", header: "Resume" },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Application Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={statusToVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        jobId={row.original.jobId}
        userId={row.original.userId}
      />
    ),
  },
];
