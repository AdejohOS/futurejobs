import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import CategoryCarousel from "./categoryCarousel";

const Hero = () => {
  return (
    <section className="container mx-auto py-20 w-full">
      <p className="text-6xl font-bold text-center">
        Search, Apply & <br /> Get Your{" "}
        <span className="text-sky-600">Dream Job</span>
      </p>
      <p className="text-center max-w-prose mx-auto text-xl mt-4 text-gray-600">
        Start you hunt for the best life changing career opurtunities from here
        in your selected areas coviniently and get hired quickly!
      </p>

      <form
        action=""
        className="mt-6 text-center flex items-center max-w-prose mx-auto"
      >
        <Input
          className="rounded-l-full border-r-0"
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
    </section>
  );
};

export default Hero;
