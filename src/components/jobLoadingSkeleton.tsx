import React from "react";
import { Skeleton } from "./ui/skeleton";

const JobsLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-5">
      <JobLoadingSkeleton />
      <JobLoadingSkeleton />
      <JobLoadingSkeleton />
    </div>
  );
};

export default JobsLoadingSkeleton;

function JobLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
}
