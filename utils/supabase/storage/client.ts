
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createClient, supabase } from "../client";
import { Court } from "@/types/type";

function getStorage() {
  const { storage } = createClient();
  return storage;
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};
export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: "", error: "Image upload failed" };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;

  return { imageUrl, error: "" };
};

export const deleteImage = async (imageUrl: string) => {
  const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1];
  const firstSlashIndex = bucketAndPathString.indexOf("/");

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).remove([path]);

  return { data, error };
};

// utils/supabase/storage/client.ts

export const insertCourtImage = async (court_id: string | string[], imageUrl: string) => {
  const { data, error } = await supabase.from('court_images').insert([
    {
      court_id,
      image_url: imageUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]);

  if (error) {
    console.error("Error inserting image into CourtImage table:", error);
    return { error };
  }

  return { data };
};

export const fetchCourtImages = async (court_id: string | string[]): Promise<string[]> => {
  try {
    // Fetch images from the court_images table
    const { data, error } = await supabase
      .from("court_images")
      .select("image_url")
      .eq("court_id", court_id);

    if (error) {
      throw error;
    }

    // Extract the image URLs from the data
    const imageUrls = data?.map((item) => item.image_url) || [];
    return imageUrls;
  } catch (error) {
    console.error("Error fetching court images:", error);
    return [];
  }
};

export const fetchCourts = async (): Promise<Court[]> => {
  try {
    // Query the courts table to get the court details
    const { data: courtsData, error: courtsError } = await supabase
      .from('courts')
      .select('id, name, location, description, host_id, court_images(image_url)')
      .order('created_at', { ascending: false }); // Order by created_at if you want the latest first

    // Check for errors in the courts query
    if (courtsError) {
      throw new Error(courtsError.message);
    }

    // Map through the courts and add the image URL to each court
    const courtsWithImages = courtsData?.map((court: any) => {
      // Extract the first image URL (you can customize this if you have multiple images per court)
      const imageUrl = court.court_images.length > 0 ? court.court_images[0].image_url : '';

      return {
        id: court.id,
        name: court.name,
        location: court.location,
        description: court.description,
        image_url: imageUrl,
        host_id: court.host_id,
      };
    });
    console.log(courtsWithImages);

    return courtsWithImages || [];
  } catch (error) {
    console.error('Error fetching courts:', error);
    return [];
  }
};
