"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GrDownload } from 'react-icons/gr';

interface HomeCardProps {
  images: string[];
  title: string;
  host: string;
  price: number;
}

const HomeCard = ({ images, title, host, price }: HomeCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-[250px] max-w-sm overflow-hidden rounded-lg">
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        {/* Images */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute h-full w-full transition-opacity duration-300 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Listing ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <button
            onClick={previousImage}
            className="rounded-full bg-white p-1 opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="rounded-full bg-white p-1 opacity-70 hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
            <GrDownload className="w-4 h-4" />
          </button>
        {/* Live Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-white/90 rounded-md">
            Live
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">Hosted by {host}</p>
        <p className="text-lg font-bold">${price} per guest</p>
      </div>
    </Card>
  );
};

export default HomeCard;