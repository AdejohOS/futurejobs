"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { ColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyColumn = {
  id: string;
  logoUrl: string;
  name: string;
  createdAt: Date;
};

const columnHelper = createColumnHelper();

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "logoUrl",
    header: "Company Logo",
    cell: ({ row }) => (
      <Image
        src={row.original.logoUrl}
        alt={`${row.original.name}'s profile`}
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name:
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
