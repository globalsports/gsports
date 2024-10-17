"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  const images = [
    "images/court-1.jpg",
    "images/court-2.jpg",
    "images/court-3.jpg",
    "images/court-4.jpg",
  ];

  return (
    <>
    <Navbar />
      <Carousel className="w-full max-w-[80rem] h-[25rem] overflow-hidden mx-auto my-5">
        <CarouselPrevious />
        <CarouselContent>       
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <img
                src={src}
                alt={`Court ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselNext />
      </Carousel>
    </>
  );
}
