"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import Image from "next/image";
import { ColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ApplicationStatus } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AppliedJobColumn = {
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  createdAt: Date;
};

export const columns: ColumnDef<AppliedJobColumn>[] = [
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
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Company name",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
];
