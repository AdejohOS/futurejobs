import { db } from "@/lib/db";
import React from "react";
import JobItem from "./_components/job-item";

const page = async () => {
  const jobs = await db.job.findMany({
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <section className="bg-slate-50 py-12 h-full">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Jobs</h2>
        {jobs.length === 0 && <h3 className="xl">No job available!</h3>}
        <div className="grid grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
