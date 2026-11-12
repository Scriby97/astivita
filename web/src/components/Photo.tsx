import Image from "next/image";
import { imageUrl, type SanityImage as SanityImageType } from "@/lib/sanity";
import { SanityImage } from "./SanityImage";

// Foto aus dem Studio – solange keins da ist, eine ruhige Fläche mit dem Hund aus dem Logo
export function Photo({
  image,
  alt,
  sizes,
  crop,
  priority,
  className = "",
}: {
  image?: SanityImageType | null;
  alt: string;
  sizes: string;
  crop?: { width: number; height: number };
  priority?: boolean;
  className?: string;
}) {
  const hasImage = Boolean(imageUrl(image));
  return (
    <div className={`relative overflow-hidden ${hasImage ? "bg-sand" : "bg-sage-light"} ${className}`}>
      {hasImage ? (
        <SanityImage image={image} alt={alt} sizes={sizes} crop={crop} priority={priority} />
      ) : (
        <Image src="/hund.svg" alt="" fill className="object-contain p-[14%] opacity-35" unoptimized />
      )}
    </div>
  );
}
