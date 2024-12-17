// CourtsPage.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchCourts } from "@/utils/supabase/storage/client"; // Fetch function for courts
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

function CourtsPage() {
  const [courts, setCourts] = useState<any[]>([]); // State to hold the list of courts
  const router = useRouter();
  const handleViewCourt = (name: string) => {
    router.push(`/${name}`); // Navigate to the dynamic route [id]
  };

  // Fetch courts from the database on component mount
  useEffect(() => {
    const fetchCourtData = async () => {
      const courtsData = await fetchCourts();
      setCourts(courtsData);
    };

    fetchCourtData();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Available Courts
      </h1>

      {/* Courts Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courts.map((court) => (
          <div
            key={court.id}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <Card className="shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={court.image_url}
                    alt={court.name}
                    className="w-full h-48 sm:h-[200px] lg:h-[250px] object-cover rounded-t-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-base lg:text-lg line-clamp-1">
                    {court.name}
                  </h3>

                  <div className="flex justify-between items-center gap-2 sm:gap-4 text-sm h-[50px]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span>{court.name}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{court.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                    <div>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto rounded-full"
                      onClick={() =>
                        handleViewCourt(court.name)
                      }
                    >
                      View Court
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourtsPage;
