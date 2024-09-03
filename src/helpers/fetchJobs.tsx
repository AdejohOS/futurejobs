"use client";

import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import MyJobs from "@/components/myjobs";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { Job, JobPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Loader } from "lucide-react";

export default function FetchJobs() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["job-feed", "my-feed"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/jobs",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<JobPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const jobs = data?.pages.flatMap((page) => page.jobs) || [];

  if (status === "pending") {
    return <Loader className="mx-auto animate-spin mt-12" />;
  }
  if (status === "error") {
    return (
      <p className="text-destructive">An error occurred while loading jobs!</p>
    );
  }
  return (
    <InfiniteScrollContainer
      onButtonReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {jobs.length === 0 && <p>No job posted yet!</p>}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5">
        {jobs.map((job) => (
          <MyJobs key={job.id} job={job} />
        ))}
      </div>
      {isFetching && <Loader className="mx-auto animate-spin mt-7" />}
    </InfiniteScrollContainer>
  );
}
