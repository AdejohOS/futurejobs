import { Skeleton } from "@/components/ui/skeleton";

const SearchLoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-4">
        <SearchLoading />
        <SearchLoading />
        <SearchLoading />
      </div>
    </div>
  );
};

export default SearchLoadingSkeleton;

function SearchLoading() {
  return (
    <div className="w-full animate-pulse rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-64 rounded" />

            <div className=" flex gap-4">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          </div>
        </div>
        <Skeleton className="h-4 w-12 rounded" />
      </div>
    </div>
  );
}
