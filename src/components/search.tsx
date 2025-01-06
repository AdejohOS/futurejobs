"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const pathName = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);

    if (!searchQuery) return;
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <>
      {pathName !== "/" && (
        <form
          action=""
          onSubmit={handleSubmit}
          className="md:flex flex-grow max-w-[500px] hidden"
        >
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-r-none "
            type="search"
            placeholder="Search jobs..."
            defaultValue={searchQuery}
          />
          <Button
            type="submit"
            variant="theme"
            className="border-l-0 rounded-l-none"
          >
            <SearchIcon className="text-white" />
          </Button>
        </form>
      )}
      <Button
        type="submit"
        variant="theme"
        className="rounded-full md:hidden"
        size="icon"
        onClick={() => setShowFullWidthSearch(true)}
      >
        <SearchIcon className="text-white" />
      </Button>
    </>
  );
};

export default Search;
