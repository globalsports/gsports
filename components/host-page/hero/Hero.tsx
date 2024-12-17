import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4 w-full">
      {/* Left Content Section */}
      <div className="flex flex-col justify-center gap-6 px-5 md:px-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
          Rent Your Sports Courts
          <br />
          Effortlessly
        </h1>
        <p className="text-muted-foreground text-lg">
          Turn your unused courts or turfs into revenue. Our platform connects court owners with sports enthusiasts. 
          List your basketball court, tennis court, football turf, or any other facility. Set your rates, showcase your court, 
          and start earning seamlessly. Let players book and enjoy their favorite sports on your premises!
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
          <Link href={"/court-listing"}>
            <Button className="rounded-full px-8 py-6 text-lg">
              List Your Court
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="rounded-full px-8 py-6 text-lg"
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Right Images Section */}
      <div className="hidden md:block relative h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full">
            {/* First Image */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96 rounded-3xl overflow-hidden transform rotate-12 shadow-xl z-20">
              <img
                src="/host/host-1.jpg"
                alt="Tennis court"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Second Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-[450px] rounded-3xl overflow-hidden shadow-xl z-30">
              <img
                src="/host/host-2.jpg"
                alt="Football turf"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Third Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-96 rounded-3xl overflow-hidden transform -rotate-12 shadow-xl z-20">
              <img
                src="/host/host-3.jpg"
                alt="Basketball court"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
