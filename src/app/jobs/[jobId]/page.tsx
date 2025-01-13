import { db } from "@/lib/db";
import React from "react";
import JobItem from "./_components/jobItem";
import { title } from "process";
import { currentUser } from "@/lib/auth";

import parse from "html-react-parser";
import { notFound } from "next/navigation";

const JobDetails = async ({ params }: { params: { jobId: string } }) => {
  const user = await currentUser();
  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },

    include: {
      company: true,
      applications: {
        where: {
          userId: user?.id,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  if (!job) {
    return notFound();
  }

  return (
    <section>
      <div className="container my-12 mx-auto">{<JobItem job={job} />}</div>
    </section>
  );
};

export default JobDetails;

export async function generateMetadata({
  params,
}: {
  params: { jobId: string };
}) {
  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      company: true,
      applications: true,
    },
  });
  return {
    title: `${job?.title} at ${job?.company.name}`,
  };
}
