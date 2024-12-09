import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {};

const Images = (props: Props) => {
  const images = [
    "images/court-1.jpg",
    "images/court-2.jpg",
    "images/court-3.jpg",
    "images/court-4.jpg",
  ];
  return (
    <div className="max-w-7xl sm:mx-auto mx-5 ">
      <div className="text-4xl font-bold text-center">About Us</div>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <img
                src={src}
                alt={`Court ${index + 1}`}
                className="w-full h-[25rem] object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default Images;
