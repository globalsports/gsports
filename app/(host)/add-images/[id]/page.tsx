"use client";
import { ChangeEvent, useRef, useState, useTransition, useEffect } from "react";
import { useParams } from "next/navigation";
import { convertBlobUrlToFile } from "@/lib/utils";
import Image from "next/image";
import {
  uploadImage,
  fetchCourtImages,
  insertCourtImage,
} from "@/utils/supabase/storage/client"; // Import the fetch function
import { Button } from "@/components/ui/button";

function HomePage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const { id: court_id } = useParams(); // Extract court_id from URL query

  // Check if court_id exists in the URL
  if (!court_id) {
    return <div>Loading...</div>; // Display loading while court_id is not available
  }

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchCourtImages(court_id);
      setUploadedImages(images);
    };

    fetchImages();
  }, [court_id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let uploadedUrls: string[] = [];
      setUploadProgress(0);

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const imageFile = await convertBlobUrlToFile(url);

        // Upload the image to Supabase storage
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "court-images",
        });

        if (error) {
          console.error(error);
          alert(`Image ${i + 1} upload failed.`);
          continue;
        }

        uploadedUrls.push(imageUrl);
        setUploadProgress(Math.round(((i + 1) / imageUrls.length) * 100));

        // Insert the image URL into the CourtImage table
        const { error: insertError } = await insertCourtImage(
          court_id,
          imageUrl
        );
        if (insertError) {
          console.error(
            "Failed to insert image into CourtImage table:",
            insertError
          );
          alert(`Failed to update CourtImage table for image ${i + 1}`);
        }
      }

      setUploadedImages([...uploadedImages, ...uploadedUrls]);
      setImageUrls([]); // Clear image URLs after upload
      setUploadProgress(0); // Reset progress bar
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">Upload Images</h1>
      {/* Image Previews */}
      <div className="flex flex-wrap gap-4">
        {imageUrls.map((url, index) => (
          <Image
            key={url}
            src={url}
            width={150}
            height={150}
            alt={`preview-${index}`}
            className="rounded-lg"
          />
        ))}
      </div>

      <div className="flex justify-between w-full">
        {/* Select Images Button */}
        <input
          type="file"
          accept="image/*"
          hidden
          multiple
          ref={imageInputRef}
          onChange={handleImageChange}
          disabled={isPending}
        />
        <Button
          onClick={() => imageInputRef.current?.click()}
          disabled={isPending}
        >
          Select Images
        </Button>

        {/* Upload Button */}
        <Button
          onClick={handleClickUploadImagesButton}
          disabled={isPending || imageUrls.length === 0}
        >
          {isPending
            ? `Uploading... ${uploadProgress}%`
            : "Upload Selected Images"}
        </Button>
      </div>

      {/* Upload Progress */}
      {isPending && (
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Uploaded Images Table */}

      <table className="table-auto border-collapse border border-gray-400 w-full mt-8 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-500 px-4 py-2">Image</th>
            <th className="border border-gray-500 px-4 py-2">URL</th>
          </tr>
        </thead>
        {uploadedImages.length > 0 && (
          <tbody>
            {uploadedImages.map((url, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-500 px-4 py-2">
                  <Image
                    src={url}
                    width={100}
                    height={100}
                    alt={`uploaded-${index}`}
                    className="rounded-lg mx-auto"
                  />
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline"
                  >
                    {url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default HomePage;
