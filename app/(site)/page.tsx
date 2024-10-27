"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/custom/Title";
import Booking from "@/components/booking/Booking";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  const images = [
    "images/court-1.jpg",
    "images/court-2.jpg",
    "images/court-3.jpg",
    "images/court-4.jpg",
  ];

  return (
    <>
      <Title isLoading={isLoading} />
      <Booking />
      {isLoading ? (
        <Skeleton className="h-[36rem] w-full mx-auto" />
      ) : (
        <Carousel className="w-full my-5">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="h-[25rem] p-0">
                    <img
                      src={src}
                      alt={`Court ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      )}
      {isLoading ? (
        <Skeleton className="h-24 w-full mx-auto" />
      ) : (
        <div className="text-md text-justify mt-4">
          Emerton Youth Recreation Centre is a community facility designed for
          indoor recreation activities. The centre features a large indoor fully
          marked court available for Badminton, Basketball, Futsal, Netball, and
          Volleyball. Centre also offers community BBQ’s and outdoor seating, a
          foyer area available for meetings, and plenty of onsite parking. To
          enquire about booking Emerton Youth Recreation Centre, please email{" "}
          <a href="mailto:Tele.Tuivanu@blacktown.nsw.gov.au">
            Tele.Tuivanu@blacktown.nsw.gov.au
          </a>
          .
        </div>
      )}

      <h2 className="text-[30px] font-semibold mt-10">Features</h2>
      <ul className="list-disc pl-6 mt-4 text-md">
        <li>Full-sized indoor basketball court</li>
        <li>Marked for various sports including Futsal and Volleyball</li>
        <li>High-quality wooden flooring designed for professional gameplay</li>
        <li>Adjustable basketball hoops to suit different skill levels</li>
        <li>Seating arrangements for spectators</li>
        <li>Access to amenities such as restrooms and locker rooms</li>
        <li>Ample on-site parking</li>
        <li>Outdoor community BBQ areas</li>
      </ul>

      <h2 className="text-[30px] font-semibold mt-10">
        Basketball Court Rental
      </h2>
      <div className="text-md mt-4">
        The basketball court at Emerton Youth Recreation Centre is available for
        rent for both casual and event-based use. Whether you're hosting a local
        league game or just looking for some casual practice time, the court
        offers a professional and well-maintained space for all types of
        players.
      </div>

      <h3 className="text-[25px] font-semibold mt-6">Rental Rates</h3>
      <ul className="list-disc pl-6 mt-4 text-md">
        <li>
          <strong>Hourly Rate:</strong> $50 per hour (casual rental)
        </li>
        <li>
          <strong>Half-Day Rate:</strong> $180 (up to 4 hours)
        </li>
        <li>
          <strong>Full-Day Rate:</strong> $320 (up to 8 hours)
        </li>
        <li>Discounts available for community groups and regular bookings.</li>
      </ul>

      <h3 className="text-[25px] font-semibold mt-6">Booking Information</h3>
      <div className="text-md mt-4 mb-20">
        To book the basketball court or for more information on availability,
        please email{" "}
        <a href="mailto:Tele.Tuivanu@blacktown.nsw.gov.au">
          Tele.Tuivanu@blacktown.nsw.gov.au
        </a>{" "}
        or call (02) 1234 5678. Advanced booking is required for all event
        rentals.
      </div>
    </>
  );
}
