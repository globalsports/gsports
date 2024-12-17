"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control, FieldValues } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { turfListingSchema } from "@/types/turf-listing.schema";

type FormControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
};
type TurfListingControlProps = FormControlProps<TurfListingFormData>;

// TypeScript Type from Zod Schema
type TurfListingFormData = z.infer<typeof turfListingSchema>;

// Step 1: Turf Type Step
const TurfTypeStep = ({ control }: TurfListingControlProps) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="turfType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Turf Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Turf Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {["Football", "Cricket", "Basketball", "Tennis"].map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// Step 2: Turf Description Step
const DescriptionStep = ({ control }: TurfListingControlProps) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Turf Name</FormLabel>
          <FormControl>
            <Input placeholder="E.g., Downtown Sports Arena" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe the turf, surface, lighting, seating, etc."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="dimensions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dimensions</FormLabel>
          <FormControl>
            <Input placeholder="E.g., 100x50 meters" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// Step 3: Address Step
const AddressStep = ({ control }: TurfListingControlProps) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input placeholder="E.g., 123 Sports Lane, City" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// Step 4: Pricing and Availability Step
const PricingStep = ({ control }: TurfListingControlProps) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="pricePerHour"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price Per Hour</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter hourly pricing"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="availableSlots"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Available Time Slots</FormLabel>
          <FormControl>
            <Textarea
              placeholder="E.g., 6 AM - 9 AM, 4 PM - 8 PM"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// Full Turf Listing Form
const TurfListingForm = () => {
  const form = useForm<TurfListingFormData>({
    resolver: zodResolver(turfListingSchema),
    defaultValues: {
      turfType: "",
      name: "",
      description: "",
      dimensions: "",
      address: "",
      pricePerHour: 0,
      availableSlots: "",
    },
  });

  const onSubmit = (data: TurfListingFormData) => {
    console.log("Form Data Submitted:", data);
    // Handle API submission here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TurfTypeStep control={form.control} />
        <DescriptionStep control={form.control} />
        <AddressStep control={form.control} />
        <PricingStep control={form.control} />
        <Button type="submit">Submit Turf Listing</Button>
      </form>
    </Form>
  );
};

export default TurfListingForm;
