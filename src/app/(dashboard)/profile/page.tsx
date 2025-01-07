import React from "react";
import Profile from "./_components/profile";
import AppliedJobs from "./_components/appliedJobs";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { currentUser } from "@/lib/auth";
import { AppliedJobColumn } from "./_components/columns";
import { AppliedJobsClient } from "./_components/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `User Profile`,
};

async function getRecruiterOverview() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }
  const [recruiterCompanyCount, recruiterJobCount, recruiterApprovedCount] =
    await Promise.all([
      await db.company.count({
        where: {
          userId: user?.id,
        },
      }),
      await db.job.count({
        where: {
          userId: user?.id,
        },
      }),
      await db.application.count({
        where: {
          job: {
            userId: user?.id,
          },
          status: "APPROVED",
        },
      }),
    ]);
  await wait(2000);

  return {
    recruiterCompanyCount,
    recruiterJobCount,
    recruiterApprovedCount,
  };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const page = async () => {
  const user = await currentUser();
  const [recruiterData] = await Promise.all([getRecruiterOverview()]);

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
        <Profile
          recruiterCompanyCount={recruiterData.recruiterCompanyCount}
          recruiterJobCount={recruiterData.recruiterJobCount}
          recruiterApprovedCount={recruiterData.recruiterApprovedCount}
        />
        {user?.role === "TALENT" && (
          <AppliedJobsClient data={formattedAppliedJobs} />
        )}
      </div>
    </section>
  );
};

export default page;
