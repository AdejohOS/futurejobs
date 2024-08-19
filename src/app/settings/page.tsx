"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { currentUser } from "@/lib/auth";
import { useCurrentUser } from "@/hooks/getCurrentUser";
import { useRouter } from "next/navigation";

const page = () => {
  const user = useCurrentUser();
  const router = useRouter();

  if (!["TALENT", "RECRUITER"].includes(user?.role!)) {
    return router.push("/role");
  }
  return <div>hello</div>;
};

export default page;
