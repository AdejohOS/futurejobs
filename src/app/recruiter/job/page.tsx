import React, { Suspense } from "react";

import { DataTable } from "../../../components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Cross, Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { JobClient } from "./_components/client";
import { TitleHeadings } from "@/components/titleHeadings";
import { currentUserId } from "@/lib/auth";
import Loading from "@/app/loading";
import { JobColumn, columns } from "./_components/columns";

const page = async () => {
  const userId = await currentUserId();

  const jobs = await db.job.findMany({
    where: {
      userId: userId,
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedJob: JobColumn[] = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    companyName: job.company.name,
    createdAt: job.createdAt,
  }));

  return (
    <section>
      <div className="container m-auto my-12">
        <Suspense fallback={<Loading />}>
          <JobClient data={formattedJob} />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
