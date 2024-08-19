"use client";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
  ];

  return (
    <section className="px-6 mx-auto w-full mt-12">
      <Carousel className="w-full max-w-lg mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="basis-1/2 md:basis-1/3 lg-basis-1/3">
              <Button onClick={() => {}} variant="outline">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
export default CategoryCarousel;
