import React from "react";
import Profile from "./_components/profile";
import AppliedJobs from "./_components/appliedJobs";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { currentUser } from "@/lib/auth";
import { AppliedJobColumn } from "./_components/columns";
import { AppliedJobsClient } from "./_components/client";

const page = async () => {
  const user = await currentUser();
  const appliedJobs = await db.application.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      job: {
        select: {
          title: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedAppliedJobs: AppliedJobColumn[] = appliedJobs.map(
    (appliedJob) => ({
      id: appliedJob.jobId,
      jobTitle: appliedJob.job.title,
      companyName: appliedJob.job.company.name,
      status: appliedJob.status,
      createdAt: appliedJob.createdAt,
    })
  );

  return (
    <section>
      <div className="container mx-auto my-12">
        <Profile />
        <AppliedJobsClient data={formattedAppliedJobs} />
      </div>
    </section>
  );
};

export default page;
