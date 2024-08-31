import React from "react";
import Profile from "./_components/profile";
import AppliedJobs from "./_components/appliedJobs";

const page = () => {
  return (
    <section>
      <div className="container mx-auto my-12">
        <Profile />
        <AppliedJobs />
      </div>
    </section>
  );
};

export default page;
