import { currentUserId } from "@/lib/auth";
import JobForm from "./_components/jobForm";
import { db } from "@/lib/db";

const JobDetails = async ({ params }: { params: { jobId: string } }) => {
  const userId = await currentUserId();

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
  });

  const companies = await db.company.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <section>
      <div className="container m-auto my-12">
        <JobForm initialData={job!} companies={companies} jobId={job?.id} />
      </div>
    </section>
  );
};

export default JobDetails;
