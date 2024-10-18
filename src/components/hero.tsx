import React from "react";
import SearchField from "./searchField";

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
      <SearchField />
    </section>
  );
};

export default Hero;
