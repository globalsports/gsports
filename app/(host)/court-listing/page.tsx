"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { Court } from "@/types/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CourtListing: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch courts from the database
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const { data, error } = await supabase.from("courts").select("*");
        if (error) {
          throw error;
        }
        setCourts(data || []);
      } catch (error) {
        console.error("Error fetching courts:", error);
        alert("Failed to fetch courts.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Court Listing</h1>
        <Button onClick={() => router.push("/add-court")}>Add Court</Button>
      </div>

      {loading ? (
        <p>Loading courts...</p>
      ) : courts.length === 0 ? (
        <p>No courts found.</p>
      ) : (
        <div className="border rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courts.map((court) => (
                <TableRow key={court.id}>
                  <TableCell className="font-medium">{court.name}</TableCell>
                  <TableCell>{court.location}</TableCell>
                  <TableCell>{court.description || "N/A"}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/add-images/${court.id}`)}
                    >
                      Add Images
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/add-slots/${court.id}`)}
                    >
                      Add Slots
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CourtListing;
