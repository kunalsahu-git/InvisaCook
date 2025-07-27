
"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Image = {
  src: string;
  alt: string;
  aiHint: string;
};

interface ProductGalleryProps {
  images: Image[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
  };

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors",
              index === activeIndex
                ? "border-accent"
                : "border-transparent hover:border-accent/50"
            )}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1">
        <div
          className="group relative w-full aspect-square overflow-hidden rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(${activeImage.src})`,
            backgroundSize: '175%',
          }}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={800}
            height={800}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            data-ai-hint={activeImage.aiHint}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
