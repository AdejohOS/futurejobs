"use client";

import { DataTable } from "@/components/ui/data-table";
import { AppliedJobColumn, columns } from "./columns";
import { TitleHeadings } from "@/components/titleHeadings";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppliedJobsClientProps {
  data: AppliedJobColumn[];
}
export const AppliedJobsClient = ({ data }: AppliedJobsClientProps) => {
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <TitleHeadings
          title={`Applied Jobs (${data.length})`}
          description="Manage your applications!."
        />
      </div>
      <DataTable columns={columns} data={data} searchKey="jobTitle" />
    </div>
  );
};
