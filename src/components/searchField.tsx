"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/search"
      className="mt-6 text-center flex items-center max-w-prose mx-auto"
    >
      <Input
        name="q"
        className="rounded-l-full rounded-r-none border-r-0"
        type="search"
        placeholder="Search jobs..."
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
