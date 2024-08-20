"use client";

import { DataTable } from "@/components/ui/data-table";
import { CompanyColumn, columns } from "./columns";

interface CompanyClientProps {
  data: CompanyColumn[];
}
export const CompanyClient = ({ data }: CompanyClientProps) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
