import { db } from "@/lib/db";
import React from "react";
import JobItem from "./_components/jobItem";

const JobDetails = async ({ params }: { params: { jobId: string } }) => {
  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      company: true,
      applications: true,
    },
  });

  const applicationCount = await db.application.count({
    where: {
      jobId: params.jobId,
    },
  });
  return (
    <section>
      <div className="container my-12 mx-auto">
        <JobItem job={job!} applicationCount={applicationCount} />
      </div>
    </section>
  );
};

export default JobDetails;
