"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CompanyColumn = {
  name: string;
};

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
