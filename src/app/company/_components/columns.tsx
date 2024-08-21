"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { ColumnHelper } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyColumn = {
  id: string;
  logoUrl: string;
  name: string;
  createdAt: string;
};

const columnHelper = createColumnHelper();

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "logoUrl",
    header: "Company Logo",
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
