import { db } from "@/lib/db";
import React from "react";
import JobItem from "./_components/job-item";
import JobSection from "@/components/jobSection";

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
    <div className="h-full">
      <JobSection />
    </div>
  );
};

export default page;
