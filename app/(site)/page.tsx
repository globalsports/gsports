"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Booking from "@/components/booking/Booking";
import { Skeleton } from "@/components/ui/skeleton";
import Images from "@/components/booking/Images";
import Feature from "@/components/booking/Feature";
import Rental from "@/components/booking/Rental";
import BookingForm from "@/components/booking/BookiForm";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);


  return (
    <div className="flex flex-col gap-16">
      <Booking />
      <Images />
      <Feature />
      <Rental />
      <BookingForm />
    </div>
  );
}
