"use client";

import { useState } from "react";
// import Image from "next/image"; // Uncomment when ready
import { useTranslations } from "next-intl";

// Mock Data
const IMAGES = [
  {
    id: 1,
    src: "/gallery-1.jpg",
    category: "gelato",
    alt: "Pistachio Scoop Close up",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    src: "/gallery-2.jpg",
    category: "shop",
    alt: "Shop Interior",
    aspect: "aspect-[4/3]",
  },
  {
    id: 3,
    src: "/gallery-3.jpg",
    category: "process",
    alt: "Making Gelato",
    aspect: "aspect-square",
  },
  {
    id: 4,
    src: "/gallery-4.jpg",
    category: "gelato",
    alt: "Strawberry Cone",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    src: "/gallery-5.jpg",
    category: "shop",
    alt: "Outdoor Seating",
    aspect: "aspect-[16/9]",
  },
  {
    id: 6,
    src: "/gallery-6.jpg",
    category: "process",
    alt: "Fresh Ingredients",
    aspect: "aspect-[3/4]",
  },
  {
    id: 7,
    src: "/gallery-7.jpg",
    category: "gelato",
    alt: "Chocolate Drizzle",
    aspect: "aspect-square",
  },
  {
    id: 8,
    src: "/gallery-8.jpg",
    category: "shop",
    alt: "Coffee Counter",
    aspect: "aspect-[4/3]",
  },
];

export default function GalleryGrid() {
  const t = useTranslations("Gallery");
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<(typeof IMAGES)[0] | null>(
    null
  );

  // Filter Logic
  const filteredImages =
    filter === "all" ? IMAGES : IMAGES.filter((img) => img.category === filter);

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up">
        {["all", "gelato", "shop", "process"].map((cat) => (
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
      {/* KEY={FILTER} is the secret sauce. It forces React to re-render the block when filter changes, triggering the animations again. */}
      <div
        key={filter}
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="break-inside-avoid group cursor-pointer animate-fade-up" // Add animation class
            style={{ animationDelay: `${index * 100}ms` }} // Staggered delay based on index
            onClick={() => setSelectedImage(image)}
          >
            <div
              className={`relative w-full ${image.aspect} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Overlay with Zoom Icon */}
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

              {/* Placeholder Div */}
              <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 font-bold">
                {/* <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /> */}
                IMG: {image.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" // Simple fade for background
          onClick={() => setSelectedImage(null)}
        >
          {/* Modal Content - animating Scale In */}
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
              <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500">
                {/* <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" /> */}
                FULLSCREEN IMG
              </div>
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
