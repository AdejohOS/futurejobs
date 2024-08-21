"use client";

import { DataTable } from "@/components/ui/data-table";
import { CompanyColumn, columns } from "./columns";
import { TitleHeadings } from "@/components/titleHeadings";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyClientProps {
  data: CompanyColumn[];
}
export const CompanyClient = ({ data }: CompanyClientProps) => {
  return (
    <>
      <div className="flex justify-between">
        <TitleHeadings
          title={`Companies (${data.length})`}
          description="Manage your companies."
        />
        <Link href="/company/create">
          <Button variant="theme" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Company
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
