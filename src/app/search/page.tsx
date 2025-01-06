"use client";
import { Card } from "@/components/ui/card";
import kyInstance from "@/lib/ky";
import { Job } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Clock, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { formatNumber, formatRelativeDate } from "@/lib/utils";
import SearchLoadingSkeleton from "./_components/search-loading-skeleton";

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { isPending, error, data } = useQuery<Job[]>({
    queryKey: ["jobSearch"],
    queryFn: () =>
      kyInstance
        .get(`/api/jobs/search`, { searchParams: { q: searchQuery || "" } })
        .json<Job[]>(),
    enabled: !!searchQuery,
  });
  if (isPending) {
    return <SearchLoadingSkeleton />;
  }
  if (error) {
    return (
      <p className="text-destructive">An error occurred while loading jobs!</p>
    );
  }
  return (
    <section className="h-full">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3">
          <Search className="size-10" />
          <span className="text-2xl">
            Search results for &#34;{searchQuery}&#34;{" "}
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {!data?.length && (
            <p className="text-muted-foreground text-xl">No result found!</p>
          )}
          {data?.map((job) => (
            <Link key={job.id} href={"/jobs/"}>
              <Card className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="relative rounded-full overflow-hidden">
                    <Image
                      src={job.company.logoUrl}
                      alt="companyLogo"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">
                      {job.title} -{" "}
                      <em className="text-muted-foreground">
                        {job.company.name}
                      </em>
                    </h2>

                    <div className="flex gap-2">
                      <Badge className="text-orange-600 bg-orange-100">
                        {job.location}
                      </Badge>
                      <Badge className="text-blue-600  bg-blue-100 ">
                        &#36; {formatNumber(job.salary)}/Year
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />{" "}
                  {formatRelativeDate(job.createdAt)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
