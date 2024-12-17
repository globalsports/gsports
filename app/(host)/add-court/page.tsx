"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/session-provider";
import { Court } from "@/types/type";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddCourt: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { session } = useSession();

  // State to hold form data
  const [formData, setFormData] = useState<Court>({
    id: "",
    name: "",
    location: "",
    description: "",
    host_id: "cc0ac6ff-8a99-44ee-90f7-d071c84f54b6",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   if (session && session.user) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       host_id: session.user.id // Set host_id from session data
  //     }));
  //   }
  // }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = "Court name is required";
    if (!formData.location) errors.location = "Location is required";
    return errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { data: courtData, error: courtError } = await supabase
        .from("courts")
        .insert([
          {
            name: formData.name,
            location: formData.location,
            description: formData.description,
            host_id: "cc0ac6ff-8a99-44ee-90f7-d071c84f54b6",
          },
        ])
        .single();

      if (courtError) {
        throw courtError;
      }

      alert("Court added successfully!");
      setFormData({
        name: "",
        location: "",
        description: "",
        id: "",
        host_id: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Error adding court.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-5xl w-full flex flex-col mx-auto gap-4"
    >
      <div className="flex-1 flex flex-col gap-4">
        <Label htmlFor="name">Court Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="flex-1"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="input"
        />
        {errors.location && (
          <span className="text-red-500 text-sm">{errors.location}</span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="flex gap-4 justify-between">
        <Button
          onClick={() => {
            router.push("/court-listing");
          }}
        >
          Go To Court Listing
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding Court..." : "Add Court"}
        </Button>
      </div>
    </form>
  );
};

export default AddCourt;
