"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Slot } from "@/types/type";

const AddSlots: React.FC = () => {
  const { id: court_id } = useParams(); // Get court_id from URL
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    price: "",
  });

  // Fetch slots for the court
  const fetchSlots = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("court_id", court_id);
      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      alert("Failed to fetch slots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (court_id) fetchSlots();
  }, [court_id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form to add a slot
  const addSlot = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.start_time || !formData.end_time || !formData.price) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const { error } = await supabase.from("slots").insert([
        {
          court_id,
          start_time: formData.start_time, // Store as string
          end_time: formData.end_time, // Store as string
          price: parseFloat(formData.price),
        },
      ]);

      if (error) throw error;

      alert("Slot added successfully!");
      setFormData({ start_time: "", end_time: "", price: "" }); // Clear form
      fetchSlots(); // Refresh slots
    } catch (error) {
      console.error("Error adding slot:", error);
      alert("Failed to add slot.");
    }
  };

  // Delete a slot
  const deleteSlot = async (slotId: string) => {
    try {
      const { error } = await supabase.from("slots").delete().eq("id", slotId);
      if (error) throw error;

      alert("Slot deleted successfully!");
      fetchSlots(); // Refresh slots after deletion
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete slot.");
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Slots</h1>

      {/* Form to Add Slots */}
      <form onSubmit={addSlot} className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            name="start_time"
            type="text"
            value={formData.start_time}
            onChange={handleChange}
            placeholder="Enter start time (e.g., 2024-12-17T08:00:00)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            name="end_time"
            type="text"
            value={formData.end_time}
            onChange={handleChange}
            placeholder="Enter end time (e.g., 2024-12-17T10:00:00)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <Button type="submit" className="w-fit" disabled={loading}>
          {loading ? "Adding..." : "Add Slot"}
        </Button>
      </form>

      {/* Slots Table */}
      <h2 className="text-xl font-semibold mb-2">Slots List</h2>
      {loading ? (
        <p>Loading slots...</p>
      ) : slots.length === 0 ? (
        <p>No slots found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} className="text-center">
                <td className="border px-4 py-2">{slot.start_time}</td>
                <td className="border px-4 py-2">{slot.end_time}</td>
                <td className="border px-4 py-2">${slot.price.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {slot.is_booked ? "Booked" : "Available"}
                </td>
                <td className="border px-4 py-2">
                  <Button
                    onClick={() => deleteSlot(slot.id)}
                    className="bg-red-500 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddSlots;
