"use client";

import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import JobsLoadingSkeleton from "@/components/jobLoadingSkeleton";
import MyJobs from "@/components/myjobs";
import kyInstance from "@/lib/ky";
import { JobPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    isError,
    isPending,
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

  if (isPending) {
    return <JobsLoadingSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-destructive">An error occurred while loading jobs!</p>
    );
  }
  return (
    <InfiniteScrollContainer
      onButtonReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {!jobs.length && !hasNextPage && (
        <p className="text-muted-foreground">No job posted yet!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-5">
        {jobs.map((job) => (
          <MyJobs key={job.id} job={job} />
        ))}
      </div>
      {isFetching && <Loader className="mx-auto animate-spin mt-7" />}
    </InfiniteScrollContainer>
  );
}
