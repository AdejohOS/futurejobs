import React from "react";
import ApplicantClient from "./_components/client";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobApplicationColumn } from "./_components/columns";

const page = async ({ params: { jobId } }: { params: { jobId: string } }) => {
  const user = await currentUser();

  const applications = await db.application.findMany({
    where: {
      jobId: jobId,
    },
    include: {
      user: true,
      job: true,
    },
  });

  const formattedApplications: JobApplicationColumn[] = applications.map(
    (application) => ({
      id: application.jobId,
      createdAt: application.createdAt,
      applicantName: application.user.name,
      resumeUrl: application.user.resumeUrl,
      email: application.user.email,
      status: application.status,
      jobId: application.jobId,
      userId: application.userId,
    })
  );

  return (
    <section className="h-full">
      <div className="container m-auto my-12 ">
        <ApplicantClient data={formattedApplications} />
      </div>
    </section>
  );
};

export default page;
