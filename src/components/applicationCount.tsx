"use client";

import useApplicationInfo from "@/hooks/useApplicationInfo";
import { ApplicationInfo } from "@/types";
import React from "react";

interface ApplicationCountProps {
  jobId: string;
  initialState: ApplicationInfo;
}
const ApplicationCount = ({ jobId, initialState }: ApplicationCountProps) => {
  const { data } = useApplicationInfo(jobId, initialState);
  return <span className="tabular-nums">{data.applications}</span>;
};

export default ApplicationCount;
