"use client";

import { DataTable } from "@/components/ui/data-table";
import { JobColumn, columns } from "./columns";
import { TitleHeadings } from "@/components/titleHeadings";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobClientProps {
  data: JobColumn[];
}
export const JobClient = ({ data }: JobClientProps) => {
  return (
    <>
      <div className="flex justify-between">
        <TitleHeadings
          title={`Jobs (${data.length})`}
          description="Manage your jobs."
        />
        <Link href="/recruiter/company/create">
          <Button variant="theme" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Job
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
