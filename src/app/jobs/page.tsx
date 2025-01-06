import { db } from "@/lib/db";
import React from "react";
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
    <div className="flex-1">
      <JobSection />
    </div>
  );
};

export default page;
