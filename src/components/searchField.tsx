"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchField = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);

    if (!searchQuery) return;
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 text-center flex items-center max-w-prose mx-auto"
    >
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-l-full rounded-r-none border-r-0"
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
  );
};

export default SearchField;
