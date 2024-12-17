import * as z from "zod";

export const turfListingSchema = z.object({
  turfType: z.string().nonempty("Turf type is required"),
  name: z.string().nonempty("Name is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  dimensions: z.string().nonempty("Dimensions are required"),
  address: z.string().nonempty("Address is required"),
  pricePerHour: z.number().min(0, "Price must be a positive number"),
  availableSlots: z.string().nonempty("Available slots are required"),
});
