import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {};

const Rental = (props: Props) => {
  // Rental package data
  const packages = [
    {
      title: "Hourly Package",
      price: "$50",
      duration: "per hour",
      benefits: [
        "Free Parking for visitors",
        "Reserved seating area for players",
        "Access to locker",
        "Shower Facilities",
      ],
    },
    {
      title: "Half-Day Package",
      price: "$180",
      duration: "up to 4 hours",
      benefits: [
        "Free Parking for visitors",
        "Reserved seating area for players",
        "Access to locker",
        "Shower Facilities",
      ],
    },
    {
      title: "Full-Day Package",
      price: "$320",
      duration: "up to 8 hours",
      benefits: [
        "Free Parking for visitors",
        "Reserved seating area for players",
        "Access to locker",
        "Shower Facilities",
        "24/7 VIP support",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-4xl font-bold text-center">Rental Rates</h2>
      <div className="flex justify-center gap-10">
        <div>Community Group Discounts</div>
        <div>Regular Booking Discounts</div>
      </div>
      <div className="flex justify-center gap-10">
        {packages.map((pkg, index) => (
          <Card
            key={index}
            className={`p-8 flex flex-col items-center gap-4 shadow-2xl ${
              pkg.title === "Half-Day Package"
                ? "bg-[#2c3140] text-background"
                : ""
            }`}
          >
            <CardTitle>{pkg.title}</CardTitle>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-bold">{pkg.price}</p>
                <p>{pkg.duration}</p>
              </div>
              <Button
                variant={"outline"}
                className={`w-full border-[#bdcdd6] border-2 ${
                  pkg.title === "Half-Day Package"
                    ? "bg-[#bdcdd6] text-background"
                    : ""
                }`}
              >
                Book Now
              </Button>
              <Separator />
              <div className="flex flex-col items-center text-sm">
                {pkg.benefits.map((benefit, i) => (
                  <p key={i}>{benefit}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rental;
