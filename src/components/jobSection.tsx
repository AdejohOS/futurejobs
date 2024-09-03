import FetchJobs from "@/helpers/fetchJobs";
import React from "react";

const JobSection = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto py-12">
        <h2 className="font-bold text-2xl mb-4">Recent Jobs</h2>
        <FetchJobs />
      </div>
    </section>
  );
};

export default JobSection;
