"use client";

import { TitleHeadings } from "@/components/titleHeadings";
import React from "react";
import { columns, JobApplicationColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ApplicantClientProps {
  data: JobApplicationColumn[];
}

const ApplicantClient = ({ data }: ApplicantClientProps) => {
  return (
    <>
      <TitleHeadings
        title={`Applicants (${data.length})`}
        description="Manage your applications!"
      />

      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};

export default ApplicantClient;
