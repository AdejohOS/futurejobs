import { TitleHeadings } from "@/components/titleHeadings";
import React from "react";
import UpdateForm from "./_components/update-form";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <section>
      <div className="container m-auto my-12">
        <div className="flex justify-between">
          <TitleHeadings
            title={`Update your profile!`}
            description="Edit the fields below to update records."
          />
        </div>
        <div className="mt-4">
          <UpdateForm initialData={user} />
        </div>
      </div>
    </section>
  );
};

export default page;
