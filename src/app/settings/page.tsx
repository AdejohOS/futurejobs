import React from "react";
import { currentUser } from "@/lib/auth";

import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();

  if (!["TALENT", "RECRUITER"].includes(user?.role!)) {
    redirect("/role");
  }
  return <div>hello Settings</div>;
};

export default page;
