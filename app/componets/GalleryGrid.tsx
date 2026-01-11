"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Define the type for a single image
interface GalleryImage {
  _id: string;
  imageUrl: string;
  category: string;
  alt: string;
  aspect: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const t = useTranslations("Gallery");
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
    null
  );

  // Dynamically create category list from images
  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))];

  // Filter Logic
  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  // Calculate aspect ratio for Tailwind CSS
  const getAspectClass = (aspectRatio: number) => {
    if (aspectRatio > 1.7) return "aspect-video"; // 16:9
    if (aspectRatio > 1.2) return "aspect-[4/3]";
    if (aspectRatio === 1) return "aspect-square";
    if (aspectRatio > 0.6) return "aspect-[3/4]";
    return "aspect-[9/16]"; // Portrait
  };

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              filter === cat
                ? "bg-primary text-white shadow-md transform scale-105"
                : "bg-white text-stone-500 border border-stone-200 hover:border-primary hover:text-primary"
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Masonry Grid Layout */}
      <div
        key={filter}
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {filteredImages.map((image, index) => (
          <div
            key={image._id}
            className="break-inside-avoid group cursor-pointer animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedImage(image)}
          >
            <div
              className={`relative w-full ${getAspectClass(image.aspect)} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <svg
                  className="w-8 h-8 text-white drop-shadow-md"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
              <Image src={image.imageUrl} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] rounded-lg overflow-hidden animate-fade-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-primary z-50 p-2 bg-black/20 rounded-full transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-full h-[80vh]">
               <Image src={selectedImage.imageUrl} alt={selectedImage.alt} fill className="object-contain" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white/80 font-sans text-sm bg-gradient-to-t from-black/80 to-transparent">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
